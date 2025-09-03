import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import { IoMdPlayCircle } from "react-icons/io";
// Remove this import - we'll create a proper API instance
// import { server } from "../services/api";
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

// Create axios instance for CORS-free requests
const api = axios.create({
  baseURL: '/api', // Uses Vite proxy in development
  withCredentials: true,
  timeout: 10000
});

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { isPlaying, allSongs, recentlyPlayed } = useSelector(
    (state) => state.audioPlayer
  );

  const allSongsFetch = async () => {
    setLoading(true);
    try {
      // Updated API call - now uses the proxy-friendly base URL
      const response = await api.get('/song/get');
      console.log(response.data);
      if (response.status === 200) {
        dispatch(setAllSongs(response.data.data));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    allSongsFetch();
  }, []);

  const handlePlaySong = (data) => {
    if (!user) {
      navigate("/login");
    }

    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }

    dispatch(setCurrentSong(data));
    dispatch(addToRecentlyPlayed(data));
    dispatch(dispatch(setIsPlaying(true)));
  };

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] mx-auto flex-1 overflow-auto p-4 md:p-6 text-white sm:rounded-lg my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}
      >
        {user && recentlyPlayed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold ">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentlyPlayed ? (
                recentlyPlayed.map((i, index) => (
                  <div
                    onClick={() => handlePlaySong(i)}
                    key={index}
                    className="hover:bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer"
                    id="songLink"
                  >
                    <div className="relative">
                      <img
                        src={i.img}
                        alt=""
                        className="rounded-lg object-contain"
                      />
                      <IoMdPlayCircle
                        size={45}
                        color="#1bd760"
                        className="absolute right-1 bottom-1 bg-[#232323] rounded-full playBtn"
                      />
                    </div>
                    <p className="text-xl my-2 font-semibold">
                      {i.name.length > 10
                        ? i.name.slice(0, 10) + "..."
                        : i.name}
                    </p>
                    <p className="text-sm">
                      {i.artist.length > 15
                        ? i.artist.slice(0, 15) + "..."
                        : i.artist}
                    </p>
                  </div>
                ))
              ) : (
                <h1>No Songs Available</h1>
              )}
            </div>
          </div>
        )}

        <Artists />

        <h2 className="text-2xl font-bold ">All Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            <h1 className="text-white">Loading....</h1>
          ) : allSongs ? (
            allSongs.map((i, index) => (
              <div
                onClick={() => handlePlaySong(i)}
                key={index}
                className="hover:bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer"
                id="songLink"
              >
                <div className="relative">
                  <img
                    src={i.img}
                    alt=""
                    className="rounded-lg object-contain"
                  />
                  <IoMdPlayCircle
                    size={45}
                    color="#1bd760"
                    className="absolute right-1 bottom-1 bg-[#232323] rounded-full playBtn"
                  />
                </div>
                <p className="text-xl my-2 font-semibold opacity-90">
                  {i.name.length > 10 ? i.name.slice(0, 10) + "..." : i.name}
                </p>
                <p className="text-sm opacity-90">
                  {i.artist.length > 15
                    ? i.artist.slice(0, 15) + "..."
                    : i.artist}
                </p>
              </div>
            ))
          ) : (
            <h1>No Songs Available</h1>
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
