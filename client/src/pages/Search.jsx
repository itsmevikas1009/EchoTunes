import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdPlayCircle } from "react-icons/io";
import {
  addToRecentlyPlayed,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import AppLayout from "../components/AppLayout";
import api from "../services/api";
import { DEFAULT_SONG_COVER, fallbackImage } from "../utils/media";

const SearchCard = ({ song, onPlay }) => (
  <button onClick={() => onPlay(song)} className="group text-left" type="button">
    <div className="glass-card song-cover overflow-hidden rounded-[26px] p-3 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="relative overflow-hidden rounded-[20px]">
        <img
          src={song.img}
          alt={song.name}
          className="aspect-square w-full object-cover"
          onError={(event) => fallbackImage(event, DEFAULT_SONG_COVER)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <IoMdPlayCircle
          size={52}
          className="absolute bottom-3 right-3 text-[#ffd166] opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </div>
      <p className="mt-4 truncate text-base font-bold text-white">{song.name}</p>
      <p className="mt-1 truncate text-sm text-white/55">{song.artist}</p>
    </div>
  </button>
);

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { recentlyPlayed } = useSelector((state) => state.audioPlayer);
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("name") || "";

  const handleInput = (e) => {
    const value = e.target.value;

    if (!value) {
      setSearchParams({});
      setResults([]);
      return;
    }

    setSearchParams({ name: value });
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await api.get(`/song/search?name=${encodeURIComponent(query)}`);
        setResults(response.song || []);
      } catch (error) {
        console.log(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query]);

  const handlePlaySong = (song) => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(setIsPlaying(true));
    dispatch(setCurrentSong(song));
    dispatch(addToRecentlyPlayed(song));
  };

  const listToRender = query ? results : recentlyPlayed;

  return (
    <AppLayout>
      <div className="page-enter space-y-6">
        <section className="mesh-card rounded-[34px] p-5 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">Search The Catalog</p>
              <h2 className="hero-title mt-4 text-4xl font-bold text-white md:text-5xl">
                Find a mood, not just a track.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                Search now feels more intentional: fewer distractions, larger targets,
                and quicker handoff from query to playback.
              </p>
            </div>

            <Link
              to="/"
              className="muted-button inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              <FaArrowLeft size={14} />
              Back home
            </Link>
          </div>

          <div className="mt-8 max-w-3xl">
            <label className="glass-panel flex items-center gap-4 rounded-[24px] px-5 py-4">
              <FaSearch className="text-[#ffd166]" />
              <input
                type="text"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
                placeholder="Search songs, artists, or a vibe..."
                value={query}
                onChange={handleInput}
              />
            </label>
          </div>
        </section>

        <section className="glass-panel rounded-[34px] p-5 md:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{query ? "Results" : "Your Loop"}</p>
              <h3 className="hero-title mt-3 text-2xl font-bold">
                {query ? `Matches for "${query}"` : "Recently played"}
              </h3>
            </div>
            <p className="text-sm text-white/45">
              {loading ? "Searching..." : `${listToRender?.length || 0} items`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="glass-card animate-pulse rounded-[26px] p-3">
                  <div className="aspect-square rounded-[20px] bg-white/6" />
                  <div className="mt-4 h-4 rounded-full bg-white/8" />
                  <div className="mt-2 h-3 w-2/3 rounded-full bg-white/6" />
                </div>
              ))}
            </div>
          ) : listToRender?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {listToRender.map((song, index) => (
                <SearchCard
                  key={song._id || `${song.name}-${index}`}
                  song={song}
                  onPlay={handlePlaySong}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
              {query
                ? "No songs matched that search yet."
                : "Play something once and it will show up here."}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Search;
