import mongoose from "mongoose";


const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    duration: {
        type: String,
    },
},
    { timestamps: true }
);


export const Song = mongoose.model("song", songSchema);

