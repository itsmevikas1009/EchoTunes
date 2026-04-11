import { Song } from "../models/song.model.js";

const DEFAULT_SONG_COVER =
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80";

const isNonEmptyString = (value) =>
    typeof value === "string" && value.trim().length > 0;

const sanitizeString = (value) => (typeof value === "string" ? value.trim() : "");

const isHttpUrl = (value) => {
    if (!isNonEmptyString(value)) {
        return false;
    }

    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};

const normalizeSongRecord = (song) => {
    const normalized = song.toObject ? song.toObject() : song;

    return {
        ...normalized,
        img: isHttpUrl(normalized?.img) ? normalized.img : DEFAULT_SONG_COVER,
        song: sanitizeString(normalized?.song),
    };
};

// Create song
export const createSong = async (req, res) => {
    const name = sanitizeString(req.body?.name);
    const artist = sanitizeString(req.body?.artist);
    const song = sanitizeString(req.body?.song);
    const img = sanitizeString(req.body?.img);
    const duration = req.body?.duration;

    const isUserArtist = req.isArtist && !req.isAdmin;
    const finalArtist = isUserArtist ? req.artistName : artist;

    if (!name || (!finalArtist && !isUserArtist)) {
        return res.status(400).json({
            success: false,
            message: "Song name and artist are required.",
        });
    }

    if (!song) {
        return res.status(400).json({
            success: false,
            message:
                "Song URL is required. If Firebase upload fails, paste a direct public audio URL.",
        });
    }

    if (!isHttpUrl(song)) {
        return res.status(422).json({
            success: false,
            message: "Song must be a valid public http/https URL.",
        });
    }

    if (img && !isHttpUrl(img)) {
        return res.status(422).json({
            success: false,
            message: "Cover image must be a valid public http/https URL.",
        });
    }

    try {
        const newSong = await Song.create({
            name,
            artist: finalArtist,
            song,
            img: img || DEFAULT_SONG_COVER,
            duration,
        });

        return res.status(200).json({
            success: true,
            data: normalizeSongRecord(newSong),
            message: img
                ? "Song created successfully"
                : "Song created successfully with default cover art",
        });
    } catch (err) {
        console.log("Create song error", err);
        return res.status(500).json({
            success: false,
            message: "Unable to create song right now.",
        });
    }
};

export const updateSong = async (req, res) => {
    const id = req.params.id;
    const name = sanitizeString(req.body?.name);
    const artist = sanitizeString(req.body?.artist);
    const song = sanitizeString(req.body?.song);
    const img = sanitizeString(req.body?.img);
    const duration = req.body?.duration;

    if (!name || !artist) {
        return res.status(400).json({
            success: false,
            message: "Song name and artist are required.",
        });
    }

    if (!song) {
        return res.status(400).json({
            success: false,
            message: "Song URL is required.",
        });
    }

    if (!isHttpUrl(song)) {
        return res.status(422).json({
            success: false,
            message: "Song must be a valid public http/https URL.",
        });
    }

    if (img && !isHttpUrl(img)) {
        return res.status(422).json({
            success: false,
            message: "Cover image must be a valid public http/https URL.",
        });
    }

    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            {
                name,
                artist,
                song,
                img: img || DEFAULT_SONG_COVER,
                duration,
            },
            { new: true, runValidators: true }
        );

        if (!updatedSong) {
            return res.status(404).json({
                success: false,
                message: "Song not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: normalizeSongRecord(updatedSong),
            message: "Song updated successfully.",
        });
    } catch (error) {
        console.log("Update song error", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update song right now.",
        });
    }
};

//delete Song
export const deleteSong = async (req, res) => {
    const id = req.params.id;

    try {
        const songToDelete = await Song.findById(id);
        if (!songToDelete) return res.status(404).send({ message: "No such song found." });

        // Ownership check: Non-admin artists can only delete their own songs
        if (req.isArtist && !req.isAdmin) {
            if (songToDelete.artist !== req.artistName) {
                return res.status(403).json({ success: false, message: "You are not authorized to delete this song." });
            }
        }

        const song = await Song.findByIdAndDelete(id, { new: true });
        const newSongs = await Song.find();

        if (!song) return res.status(400).send({ message: "No such song found." });

        return res
            .status(200)
            .send({ success: true, data: newSongs, message: "Song Deleted Successfully" });
    } catch (error) {
        return res.status(500).send({ message: error.message || "Server Error" });
    }
};

//get All song
export const getAllSongs = async (req, res) => {
    try {
        const { artist } = req.query;
        const filter = artist ? { artist: { $regex: artist, $options: "i" } } : {};
        const songs = await Song.find(filter);
        const normalizedSongs = songs.map(normalizeSongRecord);
        return res
            .status(200)
            .send({ success: true, count: normalizedSongs.length, data: normalizedSongs });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
};

export const getSingleSongs = async (req, res) => {
    try {
        const songs = await Song.findById(req.params?.id);
        return res
            .status(200)
            .send({ success: true, count: songs ? 1 : 0, data: songs ? normalizeSongRecord(songs) : null });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
};

export const searchSong = async (req, res) => {
    const { name = "" } = req.query;
    const trimmed = name.trim();

    if (!trimmed) {
        return res.status(200).json({ success: true, song: [] });
    }

    try {
        const songs = await Song.find({
            $or: [
                { name: { $regex: trimmed, $options: "i" } },
                { artist: { $regex: trimmed, $options: "i" } },
            ],
        }).sort({ name: 1 });

        return res.status(200).json({
            success: true,
            song: songs.map(normalizeSongRecord),
        });
    } catch (error) {
        console.error("searchSong error:", error);
        return res.status(500).json({ success: false, message: "Search failed." });
    }
};

export const getSongsByArtistName = async (req, res) => {
    const { name } = req.params;

    try {
        const songs = await Song.find({ artist: { $regex: name, $options: "i" } });
        if (!songs) {
            return res.status(404).json({ success: false, message: "No song found" });
        }

        return res.status(200).json({ success: true, data: songs.map(normalizeSongRecord) });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
};
