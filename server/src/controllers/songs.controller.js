import { Song } from "../models/song.model.js"


// Create song
export const createSong = async (req, res) => {

    const { name, artist, song, img, duration } = req.body;

    if (!name || !artist || !song || !img) return res.status(400).send({ message: "Missing fields" });

    try {
        const newSong = await Song.create({ name, artist, song, img, duration });

        return res.status(200).send({ success: true, data: newSong, message: "Song created successfully" });

    } catch (err) {
        // console.log(err.message);
        res.status(500).send({ message: err.message === 'song validation failed: song: Cast to string failed for value "{}" (type Object) at path "song"' ? 'Please wait few seconds to upload..' : 'Server error' });
    }
};



//delete Song
export const deleteSong = async (req, res) => {
    const id = req.params.id;

    try {
        const song = await Song.findByIdAndDelete(id, { new: true });
        const newSongs = await Song.find();

        if (!song) return res.status(400).send({ message: "No such song found." })

        return res.status(200).send({ success: true, data: newSongs, message: `Song Deleted Successfully` });

    } catch (error) {
        return res.status(500).send({ message: error.message || 'Server Error' });
    }
}


//get All song
export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        //console.log(songs);
        return res.status(200).send({ success: true, count: songs.length, data: songs })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
}



export const getSingleSongs = async (req, res) => {
    try {
        // console.log(req.params.id);
        const songs = await Song.findById(req.params?.id);
        //console.log(songs);
        return res.status(200).send({ success: true, count: songs.length, data: songs })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
}




export const searchSong = async (req, res) => {
    const { name = "" } = req.query;


    const song = await Song.find({ name: { $regex: name, $options: 'i' } });
    if (!song) {
        return res.status(400).send({
            success: false,
            message: "Not"
        });
    }

    return res.status(200).json({
        success: true,
        song,
    });
};





export const getSongsByArtistName = async (req, res) => {

    const { name } = req.params;
    // console.log(name);

    try {
        const songs = await Song.find({ artist: { $regex: name, $options: 'i' } });
        if (!songs) {
            return res.status(404).json({ success: false, message: 'No song found' });
        }

        return res.status(200).json({ success: true, data: songs });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
}