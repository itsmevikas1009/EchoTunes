import { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import { server } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { isPlaying, allSongs } = useSelector(
    (state) => state.audioPlayer
  );



  const allSongsFetch = async () => {
    try {
      const response = await axios.get(`${server}/song/get`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setAllSongs(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allSongsFetch();
  }, []);



  const handlePlaySong = (data) => {
    if (!user) {
      navigate("/login")
    }

    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }

    dispatch(setCurrentSong(data))
    dispatch(dispatch(setIsPlaying(true)));
  }

  return (
    <AppLayout>
      <div
        className={`h-[85%] bg-[#1a1a1a] flex-1 overflow-auto px-8 py-6 text-white rounded-lg mx-1 my-3 ${isPlaying ? "h-[85%]" : "h-[95%]"
          }`}
      >
        {user && (
          <>
            <h2 className="text-2xl font-bold ">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4">
                <img
                  src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
                  alt=""
                  className="rounded-lg "
                />
                <p className="text-xl my-2 font-semibold">Top 50 - Global</p>
                <p className="text-sm">
                  Your daily update of the most played...
                </p>
              </div>
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold mt-8">All Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allSongs ? (
            allSongs.map((i, index) => (
              <div
                onClick={() => handlePlaySong(i)}
                key={index}
                className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer"
              >
                <img src={i.img} alt="" className="rounded-lg " />

                <p className="text-xl my-2 font-semibold">
                  {i.name.length > 15 ? i.name.slice(0, 15) : i.name}
                </p>
                <p className="text-sm">{i.artist}</p>
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
