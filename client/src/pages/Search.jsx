import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addToRecentlyPlayed,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import { IoMdPlayCircle } from "react-icons/io";

const browse = [
  {
    title: "Blinding ",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },

  {
    title: "Blinding ",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },

  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
  {
    title: "Blinding Lights",
    image_url: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
  },
];

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isPlaying, recentlyPlayed } = useSelector(
    (state) => state.audioPlayer
  );

  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInput = (e) => {
    setSearchParams({ name: e.target.value });
  };

  const searchFetch = async (query) => {
    try {
      const response = await axios.get(`${server}/song/search?name=${query}`);
      setResults(response.data.song);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchParams.get("name")) return;

    let timer = setTimeout(() => {
      searchFetch(searchParams.get("name"));
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

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
        className={`bg-[#1a1a1a] flex-1 overflow-auto px-8 text-white rounded-lg mx-1 my-3 ${
          isPlaying ? "h-[85%]" : "h-[97%]"
        }`}
      >
        <div className="mb-8 bg-opacity-95 z-40 hidden md:block my-2 sticky top-0 ">
          <div className="flex items-center gap-6 z-10">
            <Link to="/">
              {" "}
              <FaArrowLeft size={24} color="white" />
            </Link>

            <form className="w-full py-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-[35%] p-4 px-12 rounded-full bg-[#232323] outline-none text-white shadow-xl shadow-[#0d0d0d]"
                  placeholder="What do you want to play ?"
                  // value={searchValue}
                  onChange={handleInput}
                />

                <span className="absolute left-5 top-5 mx-auto opacity-80">
                  <FaSearch color="white" />
                </span>
              </div>
            </form>
          </div>
        </div>

        {results?.length > 0 && (
          <>
            <h1 className="text-2xl font-bold">Browse all </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results?.map((i, index) => (
                <div
                  onClick={() => handlePlaySong(i)}
                  key={index}
                  className="hover:bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer"
                  id="songLink"
                >
                  <div className="relative">
                    <img src={i.img} alt="" className="rounded-lg" />
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
                    {i.artist.length > 15
                      ? i.artist.slice(0, 15) + "..."
                      : i.artist}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {results?.length === 0 && recentlyPlayed.length > 0 && (
          <>
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
                      <img src={i.img} alt="" className="rounded-lg" />
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
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Search;
