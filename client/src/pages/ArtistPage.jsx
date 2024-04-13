import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../services/api";
import {
  addToRecentlyPlayed,
  setArtistSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { isPlaying, artistSong } = useSelector((state) => state.audioPlayer);

  let { name } = useParams();

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${server}/song/artists/${name}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(setArtistSongs(res.data.data));
    } catch (err) {
      console.log(err || "Error in Fetching Data");
    }
  };

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

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <AppLayout>
      <div
        className={`bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3 ${
          isPlaying ? "h-[85%]" : "h-[97%]"
        }`}
      >
        <h2 className="text-2xl font-bold my-4">{name} Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artistSong ? (
            artistSong.map((i, index) => (
              <div
                onClick={() => handlePlaySong(i)}
                key={index}
                className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer hover:bg-green-300 hover:bg-opacity-20"
              >
                <img src={i.img} alt="" className="rounded-lg " />

                <p className="text-xl my-2 font-semibold">
                  {i.name.length > 10 ? i.name.slice(0, 10) + "..." : i.name}
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
    </AppLayout>
  );
};

export default ArtistPage;
