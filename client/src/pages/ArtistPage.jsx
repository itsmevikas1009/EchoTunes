import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api"; // centralized axios instance
import {
  addToRecentlyPlayed,
  setArtistSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import { IoMdPlayCircle } from "react-icons/io";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isPlaying, artistSong } = useSelector((state) => state.audioPlayer);
  let { name } = useParams();

  const fetchSongs = async () => {
    try {
      const res = await api.get(`/song/artists/${name}`);
      if (res.success && res.data) {
        dispatch(setArtistSongs(res.data));
      } else {
        console.error("Invalid response format");
      }
    } catch (err) {
      console.error(err || "Error in Fetching Data");
    }
  };

  const handlePlaySong = (data) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }

    dispatch(setCurrentSong(data));
    dispatch(addToRecentlyPlayed(data));
    dispatch(setIsPlaying(true));
  };

  useEffect(() => {
    fetchSongs();
  }, [name]); // Adding name to deps to refetch if route param changes

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}
      >
        <h2 className="text-2xl font-bold my-4">{name} Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artistSong && artistSong.length > 0 ? (
            artistSong.map((i, index) => (
              <div
                onClick={() => handlePlaySong(i)}
                key={index}
                className="hover:bg-[#232323] rounded-lg p-3 ms-4 mt-4 cursor-pointer"
                id="songLink"
              >
                <div className="relative">
                  <img
                    src={i.img}
                    alt={`${i.name} cover`}
                    className="rounded-lg object-contain"
                  />
                  <IoMdPlayCircle
                    size={45}
                    color="#1bd760"
                    className="absolute right-1 bottom-1 bg-[#232323] rounded-full playBtn"
                  />
                </div>
                <p className="text-xl my-2 font-semibold">
                  {i.name.length > 10 ? i.name.slice(0, 10) + "..." : i.name}
                </p>
                <p className="text-sm">
                  {i.artist.length > 15 ? i.artist.slice(0, 15) + "..." : i.artist}
                </p>
              </div>
            ))
          ) : (
            <h1>No Songs Available</h1>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ArtistPage;
