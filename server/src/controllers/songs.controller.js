import { Song } from "../models/song.model.js"


// Create song
export const createSong = async (req, res) => {

    const { name, artist, song, img, duration } = req.body;
    // console.log(song, img);

    if (!name || !artist || !song || !img) return res.status(400).send({ message: "Missing fields" });

    try {
        const newSong = await Song.create({ name, artist, song, img, duration });

        return res.status(200).send({ success: true, data: newSong, message: "Song created successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message || 'Server error' });
    }
};




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