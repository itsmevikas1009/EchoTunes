import { Artist } from "../models/artist.model.js";
import { ArtistApplication } from "../models/artistApplication.model.js";
import { User } from "../models/user.model.js";

const DEFAULT_ARTIST_IMAGE =
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80";

const sanitizeString = (value) => (typeof value === "string" ? value.trim() : "");

const isHttpUrl = (value) => {
    if (!value) return false;
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};

const normalizeArtistRecord = (artist) => {
    const normalized = artist.toObject ? artist.toObject() : artist;
    return {
        ...normalized,
        profileImage: isHttpUrl(normalized?.profileImage)
            ? normalized.profileImage
            : DEFAULT_ARTIST_IMAGE,
    };
};

/* ───────────────── Admin: add artist directly ───────────────── */
export const addArtist = async (req, res) => {
    try {
        const name = sanitizeString(req.body?.name);
        const profileImage = sanitizeString(req.body?.profileImage);

        if (!name) {
            return res.status(400).json({ success: false, message: "Artist name is required." });
        }

        if (profileImage && !isHttpUrl(profileImage)) {
            return res.status(422).json({ success: false, message: "Profile image must be a valid public URL." });
        }

        const existing = await Artist.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
        if (existing) {
            return res.status(409).json({ success: false, message: "An artist with this name already exists." });
        }

        const artist = await Artist.create({
            name,
            profileImage: profileImage || DEFAULT_ARTIST_IMAGE,
        });

        return res.status(201).json({
            success: true,
            message: profileImage ? "Artist added successfully." : "Artist added with default image.",
            data: normalizeArtistRecord(artist),
        });
    } catch (error) {
        console.error("addArtist error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Admin: delete artist ───────────────── */
export const deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await Artist.findByIdAndDelete(id);
        if (!artist) {
            return res.status(404).json({ success: false, message: "Artist not found." });
        }
        return res.status(200).json({ success: true, message: "Artist deleted successfully." });
    } catch (error) {
        console.error("deleteArtist error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Public: list all artists ───────────────── */
export const getArtist = async (req, res) => {
    try {
        const artists = await Artist.find({}).sort({ name: 1 });
        return res.status(200).json({
            success: true,
            data: artists.map(normalizeArtistRecord),
        });
    } catch (error) {
        console.error("getArtist error:", error);
        return res.status(400).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── User: submit application ───────────────── */
export const applyAsArtist = async (req, res) => {
    try {
        const userId = req.userId;
        const name = sanitizeString(req.body?.name);
        const bio = sanitizeString(req.body?.bio);
        const profileImage = sanitizeString(req.body?.profileImage);

        if (!name) {
            return res.status(400).json({ success: false, message: "Artist name is required." });
        }

        if (profileImage && !isHttpUrl(profileImage)) {
            return res.status(422).json({ success: false, message: "Profile image must be a valid public URL." });
        }

        // Only one pending application per user
        const pendingExists = await ArtistApplication.findOne({ userId, status: "pending" });
        if (pendingExists) {
            return res.status(409).json({
                success: false,
                message: "You already have a pending application. Please wait for admin review.",
            });
        }

        const user = await User.findById(userId);

        const application = await ArtistApplication.create({
            userId,
            userName: user?.name || "",
            name,
            bio,
            profileImage: profileImage || DEFAULT_ARTIST_IMAGE,
        });

        return res.status(201).json({
            success: true,
            message: "Your artist application has been submitted. An admin will review it shortly.",
            data: application,
        });
    } catch (error) {
        console.error("applyAsArtist error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── User: my application status ───────────────── */
export const getMyApplication = async (req, res) => {
    try {
        const application = await ArtistApplication.findOne({ userId: req.userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: application || null,
        });
    } catch (error) {
        console.error("getMyApplication error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Admin: list all applications ───────────────── */
export const getAllApplications = async (req, res) => {
    try {
        const { status } = req.query; // optional filter: pending | approved | rejected
        const filter = status ? { status } : {};
        const applications = await ArtistApplication.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: applications,
            count: applications.length,
        });
    } catch (error) {
        console.error("getAllApplications error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Admin: approve application ───────────────── */
export const approveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewNote = sanitizeString(req.body?.reviewNote);

        const application = await ArtistApplication.findById(id);
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found." });
        }

        if (application.status !== "pending") {
            return res.status(400).json({ success: false, message: `Application is already ${application.status}.` });
        }

        // Create the actual Artist entry (deduplicate by name)
        let artist = await Artist.findOne({ userId: application.userId });
        if (!artist) {
            artist = await Artist.create({
                userId: application.userId,
                name: application.name,
                bio: application.bio,
                profileImage: isHttpUrl(application.profileImage) ? application.profileImage : DEFAULT_ARTIST_IMAGE,
            });
        } else {
            // Update existing artist record if somehow already exists
            artist.name = application.name;
            artist.bio = application.bio;
            artist.profileImage = isHttpUrl(application.profileImage) ? application.profileImage : DEFAULT_ARTIST_IMAGE;
            await artist.save();
        }

        application.status = "approved";
        application.reviewNote = reviewNote || "Your application has been approved. Welcome!";
        application.reviewedAt = new Date();
        await application.save();

        // Update User role and link Artist ID
        await User.findByIdAndUpdate(application.userId, { 
            isArtist: true,
            artistId: artist._id 
        });

        return res.status(200).json({
            success: true,
            message: `Application approved. Artist "${application.name}" is now live.`,
            data: { application, artist: normalizeArtistRecord(artist) },
        });
    } catch (error) {
        console.error("approveApplication error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Admin: reject application ───────────────── */
export const rejectApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewNote = sanitizeString(req.body?.reviewNote);

        const application = await ArtistApplication.findById(id);
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found." });
        }

        if (application.status !== "pending") {
            return res.status(400).json({ success: false, message: `Application is already ${application.status}.` });
        }

        application.status = "rejected";
        application.reviewNote = reviewNote || "Your application did not meet our current requirements.";
        application.reviewedAt = new Date();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application rejected.",
            data: application,
        });
    } catch (error) {
        console.error("rejectApplication error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Artist: get own profile ───────────────── */
export const getMyArtistProfile = async (req, res) => {
    try {
        const artist = await Artist.findOne({ userId: req.userId });
        if (!artist) {
            return res.status(404).json({ success: false, message: "Artist profile not found." });
        }
        return res.status(200).json({ success: true, data: normalizeArtistRecord(artist) });
    } catch (error) {
        console.error("getMyArtistProfile error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

/* ───────────────── Artist: update own profile ───────────────── */
export const updateMyArtistProfile = async (req, res) => {
    try {
        const name = sanitizeString(req.body?.name);
        const bio = sanitizeString(req.body?.bio);
        const profileImage = sanitizeString(req.body?.profileImage);

        if (!name) {
            return res.status(400).json({ success: false, message: "Stage name is required." });
        }

        if (profileImage && !isHttpUrl(profileImage)) {
            return res.status(422).json({ success: false, message: "Profile image must be a valid public URL." });
        }

        const artist = await Artist.findOneAndUpdate(
            { userId: req.userId },
            { name, bio, profileImage: profileImage || DEFAULT_ARTIST_IMAGE },
            { new: true, runValidators: true }
        );

        if (!artist) {
            return res.status(404).json({ success: false, message: "Artist profile not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Artist profile updated successfully.",
            data: normalizeArtistRecord(artist),
        });
    } catch (error) {
        console.error("updateMyArtistProfile error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};
