import mongoose from "mongoose";

const artistApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    bio: { type: String, default: "", trim: true },
    profileImage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewNote: { type: String, default: "" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export const ArtistApplication = mongoose.model(
  "ArtistApplication",
  artistApplicationSchema
);
