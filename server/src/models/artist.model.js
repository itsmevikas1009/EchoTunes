import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profileImage: {
        type: String,
    },
},
    { timestamps: true }
)

export const Artist = mongoose.model("Artist", artistSchema)