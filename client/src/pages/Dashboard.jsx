import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import { IoMdPlayCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToRecentlyPlayed,
  setAllSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import Artists from "../components/Artists";
import BottomBar from "../components/BottomBar";

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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { isPlaying, allSongs, recentlyPlayed } = useSelector(
    (state) => state.audioPlayer
  );

  useEffect(() => {
    const abortController = new AbortController();

    const allSongsFetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/song/get', {
          signal: abortController.signal
        });

        if (response.success && response.data) {
          dispatch(setAllSongs(response.data));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        // Don't set error if request was cancelled
        if (error.name !== 'CanceledError') {
          setError(error.response?.data?.message || 'Failed to fetch songs');
          console.error('Error fetching songs:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    allSongsFetch();

    // Cleanup function to cancel request if component unmounts
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  const handlePlaySong = (data) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fixed: Remove double dispatch
    dispatch(setCurrentSong(data));
    dispatch(addToRecentlyPlayed(data));
    dispatch(setIsPlaying(true));
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Error state
  if (error) {
    return (
      <AppLayout>
        <div className={`bg-[#1a1a1a] mx-auto flex-1 overflow-auto p-4 md:p-6 text-white sm:rounded-lg my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <BottomBar />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] mx-auto flex-1 overflow-auto p-4 md:p-6 text-white sm:rounded-lg my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}
      >
        {/* Recently Played Section */}
        {user && recentlyPlayed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentlyPlayed.map((song, index) => (
                <div
                  onClick={() => handlePlaySong(song)}
                  key={`recent-${song.id || index}`}
                  className="hover:bg-[#232323] rounded-lg p-3 cursor-pointer transition-colors duration-200"
                >
                  <div className="relative group">
                    <img
                      src={song.img}
                      alt={`${song.name} cover`}
                      className="rounded-lg object-cover w-full aspect-square"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/fallback-song-cover.png';
                      }}
                    />
                    <IoMdPlayCircle
                      size={45}
                      color="#1bd760"
                      className="absolute right-1 bottom-1 bg-[#232323] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  <p className="text-xl my-2 font-semibold truncate" title={song.name}>
                    {song.name.length > 10 ? `${song.name.slice(0, 10)}...` : song.name}
                  </p>
                  <p className="text-sm truncate" title={song.artist}>
                    {song.artist.length > 15 ? `${song.artist.slice(0, 15)}...` : song.artist}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artists Section */}
        <Artists />

        {/* All Songs Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold">All Songs</h2>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-2 text-white">Loading songs...</span>
            </div>
          ) : allSongs && allSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allSongs.map((song, index) => (
                <div
                  onClick={() => handlePlaySong(song)}
                  key={song.id || index}
                  className="hover:bg-[#232323] rounded-lg p-3 cursor-pointer transition-colors duration-200 group"
                >
                  <div className="relative">
                    <img
                      src={song.img}
                      alt={`${song.name} cover`}
                      className="rounded-lg object-cover w-full aspect-square"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/fallback-song-cover.png';
                      }}
                    />
                    <IoMdPlayCircle
                      size={45}
                      color="#1bd760"
                      className="absolute right-1 bottom-1 bg-[#232323] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  <p className="text-xl my-2 font-semibold opacity-90 truncate" title={song.name}>
                    {song.name.length > 10 ? `${song.name.slice(0, 10)}...` : song.name}
                  </p>
                  <p className="text-sm opacity-90 truncate" title={song.artist}>
                    {song.artist.length > 15 ? `${song.artist.slice(0, 15)}...` : song.artist}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No songs available</p>
            </div>
          )}
        </div>

        <div className="footer">
          <div className="line"></div>
        </div>
      </div>
      <BottomBar />
    </AppLayout>
  );
};

export default Dashboard;
