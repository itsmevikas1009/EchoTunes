import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setIsPlaying, setIsSearch } from "../redux/reducers/audioPlayer";
// import { useHistory } from "react-router-dom"

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

  const { isPlaying, songIndex } = useSelector((state) => state.audioPlayer);

  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();



  console.log(results);


  const handleInput = (e) => {
    setSearchParams({ name: e.target.value });
  }

  const search = async (query) => {
    try {
      const response = await axios.get(`${server}/song/search?name=${query}`);
      console.log("response data", response.data.song);
      setResults(response.data.song);
      // dispatch(setSearchResults(response.data.data));
      // dispatch(setCurrentSong(0));
      dispatch(setIsSearch(true));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (!searchParams.get('name')) return;

    let timer = setTimeout(() => {
      search(searchParams.get('name'));
    }, 1000);

    return () => clearTimeout(timer);

  }, [searchParams])



  const setCurrentPlaySong = (songindexx) => {

    if (!user) {
      navigate("/login")
    }
    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }


    if (songIndex !== songindexx) {
      dispatch(setCurrentSong(songindexx));
    } else {
      dispatch(setCurrentSong(songindexx));
    }
  };

  return (
    <AppLayout>
      <div className="h-[85%] bg-[#1a1a1a] flex-1 overflow-auto px-8 text-white rounded-lg mx-1 my-3">
        <div className="bg-opacity-95 z-40 hidden md:block my-2 sticky top-0 bg-[#1a1a1a]">
          <div className="flex items-center gap-6 z-10">
            <Link to="/">
              {" "}
              <FaArrowLeft size={24} color="white" />
            </Link>

            <form className="w-full py-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-[35%] p-4 px-12 rounded-full bg-[#232323]  shadow-slate-50 shadow-sm outline-none text-white "
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

        <h1 className="text-2xl font-bold">Browse all </h1>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 z-10 ">
          {results?.length === 0 ? <h1 className="text-lg text-center py-6  w-full"> No Song Found</h1> :
            results?.map((i, index) => {
              const { name, img, artist } = i;

              return (
                <div onClick={() => setCurrentPlaySong(index)}
                  key={index}
                  className="bg-[#232323] rounded-lg  p-3 ms-4 mt-4 cursor-pointer"
                >
                  <img
                    src={img}
                    alt=""
                    className="rounded-lg "
                  />


                  <p className="text-xl my-2 font-semibold">
                    {name.length > 15 ? name.slice(0, 15) : name}
                  </p>
                  <p className="text-sm">{artist}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
