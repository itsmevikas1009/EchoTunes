import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";
import axios from "axios";

// Production-ready API instance
const api = axios.create({
  baseURL: import.meta.env.PROD
    ? `${import.meta.env.VITE_API_URL}/api`  // Production: full URL
    : '/api', // Development: use proxy
  withCredentials: true,
  timeout: 10000
});

// Request interceptor for debugging (development only)
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

const Artists = () => {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchArtist = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/artist/get', {
          signal: abortController.signal
        });

        setArtistData(response.data || []);
      } catch (error) {
        // Don't set error if request was cancelled
        if (error.name !== 'CanceledError') {
          setError(error.response?.data?.message || 'Failed to fetch artists');
          console.error('Error fetching artists:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();

    // Cleanup function to cancel request if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-2">Loading artists...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>
        <div className="text-red-500 text-center py-8">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!artistData || artistData.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No artists found</p>
        </div>
      </div>
    );
  }

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
