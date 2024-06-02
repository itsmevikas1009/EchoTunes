import { Artist } from "../models/artist.model.js";

export const addArtist = async (req, res) => {
    try {
        const { name, profileImage } = req.body;

        const artist = await Artist.create({ name, profileImage });

        return res.status(200).json({
            success: true,
            message: "Added",
            data: artist
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const getArtist = async (req, res) => {
    try {

        const artist = await Artist.find({});

        return res.status(200).json({
            success: true,
            data: artist
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}