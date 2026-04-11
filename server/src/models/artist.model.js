import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    bio: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    { timestamps: true }
)

export const Artist = mongoose.model("Artist", artistSchema)