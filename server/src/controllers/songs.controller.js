import { Song } from "../models/song.model.js"


// Create song
export const createSong = async (req, res) => {

    const { name, artist, song, img, duration } = req.body;

    if (!name || !artist || !song || !img) return res.status(400).send({ message: "Missing fields" });

    try {
        const newSong = await Song.create({ name, artist, song, img, duration });

        return res.status(200).send({ data: newSong, message: "Song created successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message || 'Server error' });
    }
};