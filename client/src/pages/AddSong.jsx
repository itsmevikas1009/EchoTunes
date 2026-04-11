import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMusic } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import AppLayout from "../components/AppLayout";
import FileInput from "../components/FileInput";
import api from "../services/api";

const AddSong = () => {
  const [data, setData] = useState({
    name: "",
    artist: "",
    img: null,
    song: null,
    duration: 0,
  });

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/song/create", data);
      toast.success(res.message);
      setData({
        name: "",
        artist: "",
        img: null,
        song: null,
        duration: 0,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding song");
    }
  };

  return (
    <AppLayout>
      <section className="glass-panel page-enter rounded-[34px] p-5 md:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin Upload</p>
            <h1 className="hero-title mt-3 text-3xl font-bold text-white md:text-4xl">
              Add a new song
            </h1>
          </div>
          <Link
            to="/"
            className="muted-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            <FaArrowLeft size={12} />
            Back home
          </Link>
        </div>

        <form className="mx-auto max-w-3xl space-y-5" onSubmit={handleSave}>
          <div className="rounded-[24px] border border-amber-300/15 bg-amber-400/10 px-4 py-4 text-sm leading-7 text-amber-100">
            Files now upload through the backend to Cloudinary. If that upload is unavailable,
            you can still paste direct public URLs for the song file and cover image below.
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">
              Song name
            </label>
            <input
              type="text"
              placeholder="Song name"
              name="name"
              onChange={(e) => handleInputState("name", e.target.value)}
              value={data.name}
              className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">
              Artist
            </label>
            <input
              type="text"
              name="artist"
              placeholder="Artist name"
              onChange={(e) => handleInputState("artist", e.target.value)}
              value={data.artist}
              className="glass-card w-full rounded-2xl px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="glass-card rounded-[28px] p-4">
            <FileInput
              label="Choose song"
              icon={<FaMusic />}
              type="audio"
              name="song"
              handleInputState={handleInputState}
              value={data.song}
              helperText="Upload an audio file to Cloudinary through the backend, or paste a direct MP3/audio URL."
            />
          </div>

          <div className="glass-card rounded-[28px] p-4">
            <FileInput
              label="Choose image"
              type="image"
              name="img"
              value={data.img}
              handleInputState={handleInputState}
              helperText="Upload cover art to Cloudinary through the backend, or paste a direct image URL. A default cover will be used if you leave this empty."
            />
          </div>

          <button
            className="accent-button w-full rounded-2xl px-4 py-3 text-base font-extrabold transition duration-200"
            type="submit"
          >
            Publish song
          </button>
        </form>
      </section>
    </AppLayout>
  );
};

export default AddSong;
