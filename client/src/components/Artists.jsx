import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";
import api from "../services/api.js";

const Artists = () => {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    api.get('/artist/get', { signal: controller.signal })
      .then(data => {
        setArtistData(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'CanceledError') {
          setError(err.response?.data?.message || 'Failed to fetch artists');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading artists...</div>;
  if (error) return <div>Error: {error}</div>;
  if (artistData.length === 0) return <div>No artists found</div>;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {artistData.map((artist) => (
          <Link
            to={`/artists/${encodeURIComponent(artist.name)}`}
            key={artist._id}
            className="rounded-lg p-3 cursor-pointer hover:bg-[#232323] transition-colors duration-200"
          >
            <div className="relative">
              <img
                src={artist.profileImage}
                alt={`${artist.name} profile`}
                className="rounded-full object-cover w-full aspect-square"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/fallback-artist-image.png'; // Add fallback image
                }}
              />
              <IoMdPlayCircle
                size={45}
                color="#1bd760"
                className="absolute right-0 bottom-0 bg-[#232323] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            <p className="text-lg font-semibold opacity-90 py-2 truncate">
              {artist.name}
            </p>
            <p className="text-sm italic opacity-90">Artist</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
