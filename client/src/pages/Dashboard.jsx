import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import { server } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToRecentlyPlayed,
  setAllSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import Artists from "../components/Artists";

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
      const response = await axios.get(`${server}/song/get`, {
        withCredentials: true,
      });

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
        className={`bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3 ${isPlaying ? "h-[85%]" : "h-[97%]"
          }`}
      >
        {user && recentlyPlayed.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold ">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> */}
              {recentlyPlayed ? (
                recentlyPlayed.map((i, index) => (
                  <div
                    onClick={() => handlePlaySong(i)}
                    key={index}
                    className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer "
                  >
                    <img src={i.img} alt="" className="rounded-lg " />

                    <p className="text-xl my-2 font-semibold">
                      {i.name.length > 15 ? i.name.slice(0, 15) : i.name}
                    </p>
                    <p className="text-sm">{i.artist.length > 15 ? i.artist.slice(0, 15) : i.artist}</p>
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
          {loading ? <h1 className="text-white">Loading....</h1> : allSongs ? (
            allSongs.map((i, index) => (
              <div
                onClick={() => handlePlaySong(i)}
                key={index}
                className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer hover:bg-green-300 hover:bg-opacity-20"
              >
                <img src={i.img} alt="" className="rounded-lg " />

                <p className="text-xl my-2 font-semibold opacity-90">
                  {i.name.length > 10 ? i.name.slice(0, 10) + "..." : i.name}
                </p>
                <p className="text-sm opacity-90">{i.artist.length > 15 ? i.artist.slice(0, 15) + "..." : i.artist}</p>
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
    </AppLayout>
  );
};

export default Dashboard;
