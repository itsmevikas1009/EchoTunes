import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";
import api from "../services/api.js";
import { DEFAULT_ARTIST_IMAGE, fallbackImage } from "../utils/media";

const Artists = () => {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    api
      .get("/artist/get", { signal: controller.signal })
      .then((data) => {
        setArtistData(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || "Failed to fetch artists");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="glass-panel rounded-[34px] p-5 md:p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Faces Behind The Sound</p>
          <h3 className="hero-title mt-3 text-2xl font-bold">Featured artists</h3>
        </div>
        {!loading && !error && (
          <p className="text-sm text-white/45">{artistData.length} artist profiles</p>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="glass-card animate-pulse rounded-[26px] p-4">
              <div className="aspect-square rounded-full bg-white/6" />
              <div className="mx-auto mt-4 h-4 w-2/3 rounded-full bg-white/8" />
              <div className="mx-auto mt-2 h-3 w-1/3 rounded-full bg-white/6" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
          {error}
        </div>
      )}

      {!loading && !error && artistData.length === 0 && (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
          No artists found.
        </div>
      )}

      {!loading && !error && artistData.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {artistData.map((artist) => (
            <Link
              to={`/artists/${encodeURIComponent(artist.name)}`}
              key={artist._id}
              className="group"
            >
              <div className="glass-card overflow-hidden rounded-[26px] p-4 text-center transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <div className="relative mx-auto max-w-[220px]">
                  <img
                    src={artist.profileImage}
                    alt={`${artist.name} profile`}
                    className="aspect-square w-full rounded-full object-cover"
                    loading="lazy"
                    onError={(event) => fallbackImage(event, DEFAULT_ARTIST_IMAGE)}
                  />
                  <IoMdPlayCircle
                    size={48}
                    className="absolute bottom-2 right-2 text-[#ffd166] opacity-0 transition duration-300 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-4 truncate text-lg font-bold text-white">{artist.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-white/40">
                  Artist
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Artists;
