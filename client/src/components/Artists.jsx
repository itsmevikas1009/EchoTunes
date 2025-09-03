import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";
import axios from "axios";
// Remove this import - we'll create a proper API instance
// import { server } from "../services/api";

// Create axios instance for CORS-free requests
const api = axios.create({
  baseURL: '/api', // Uses Vite proxy in development, direct API URL in production
  withCredentials: true,
  timeout: 10000
});

const Artists = () => {
  const [artistData, setArtistData] = useState([]);

  const fetchArtist = async () => {
    try {
      // Updated API call - now uses the proxy-friendly base URL
      const res = await api.get('/artist/get');
      setArtistData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 space-x-4 space-y-6">
        {artistData?.map((artist) => (
          <Link
            to={`/artists/${artist.name}`}
            key={artist._id}
            className="rounded-lg p-3 ms-4 mt-4 cursor-pointer hover:bg-[#232323]"
            id="artistLink"
          >
            <div className="relative">
              <img
                src={artist.profileImage}
                alt={`Image of ${artist.name}`}
                className="rounded-full object-contain"
              />
              <IoMdPlayCircle
                size={45}
                color="#1bd760"
                className="absolute sm:right-0 sm:bottom-0 -right-0.5 -bottom-0.5 bg-[#232323] rounded-full playBtn"
              />
            </div>
            <p className="text-lg font-semibold opacity-90 py-2">{artist.name}</p>
            <p className="text-sm italic opacity-90">Artist</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
