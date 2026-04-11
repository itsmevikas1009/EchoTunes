import { useEffect, useState } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import { HiArrowTrendingUp, HiMiniSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToRecentlyPlayed,
  setAllSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import AppLayout from "../components/AppLayout";
import Artists from "../components/Artists";
import api from "../services/api";
import { DEFAULT_SONG_COVER, fallbackImage } from "../utils/media";

const SongCard = ({ song, onPlay, tag }) => (
  <button
    onClick={() => onPlay(song)}
    className="group text-left"
    type="button"
  >
    <div className="glass-card song-cover overflow-hidden rounded-[26px] p-3 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="relative overflow-hidden rounded-[20px]">
        <img
          src={song.img}
          alt={`${song.name} cover`}
          className="aspect-square w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          onError={(event) => fallbackImage(event, DEFAULT_SONG_COVER)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.26em] text-white/80">
          {tag}
        </div>
        <IoMdPlayCircle
          size={52}
          className="absolute bottom-3 right-3 text-[#ffd166] opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="mt-4">
        <p className="truncate text-base font-bold text-white">{song.name}</p>
        <p className="mt-1 truncate text-sm text-white/55">{song.artist}</p>
      </div>
    </div>
  </button>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { allSongs, recentlyPlayed } = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    const abortController = new AbortController();

    const allSongsFetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/song/get", {
          signal: abortController.signal,
        });

        if (response.success && response.data) {
          dispatch(setAllSongs(response.data));
        } else {
          throw new Error("Invalid response format");
        }
      } catch (fetchError) {
        if (fetchError.name !== "CanceledError") {
          setError(fetchError.response?.data?.message || "Failed to fetch songs");
          console.error("Error fetching songs:", fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    allSongsFetch();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  const handlePlaySong = (song) => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(setCurrentSong(song));
    dispatch(addToRecentlyPlayed(song));
    dispatch(setIsPlaying(true));
  };

  const heroSongs = allSongs?.slice(0, 3) || [];

  if (error) {
    return (
      <AppLayout>
        <section className="glass-panel page-enter rounded-[34px] p-6 md:p-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow justify-center">Playback interrupted</p>
            <h2 className="hero-title mt-4 text-3xl font-bold text-white">
              Something broke the rhythm
            </h2>
            <p className="mt-4 text-white/65">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="accent-button mt-8 rounded-full px-6 py-3 font-bold transition duration-200"
            >
              Try again
            </button>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="page-enter space-y-6">
        <section className="mesh-card overflow-hidden rounded-[34px] p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Front Row Listening</p>
              <h2 className="hero-title mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Music should feel like an event, not a spreadsheet.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                EchoTunes now opens like a curated venue: warmer tones, clearer
                hierarchy, faster scan paths, and enough drama to make browsing fun.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (heroSongs[0]) {
                      handlePlaySong(heroSongs[0]);
                    }
                  }}
                  className="accent-button rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] transition duration-200"
                  type="button"
                >
                  Play spotlight
                </button>
                <button
                  onClick={() => navigate("/search")}
                  className="muted-button rounded-full px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
                  type="button"
                >
                  Explore catalog
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="glass-card rounded-[26px] p-4">
                <div className="flex items-center gap-3 text-[#ffd166]">
                  <HiArrowTrendingUp size={18} />
                  <span className="text-xs uppercase tracking-[0.24em]">
                    Current mood
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-white">
                  {allSongs?.length || 0}
                </p>
                <p className="mt-2 text-sm text-white/55">Tracks ready to queue</p>
              </div>
              <div className="glass-card rounded-[26px] p-4">
                <div className="flex items-center gap-3 text-[#ffd166]">
                  <HiMiniSparkles size={18} />
                  <span className="text-xs uppercase tracking-[0.24em]">
                    Your loop
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-white">
                  {recentlyPlayed?.length || 0}
                </p>
                <p className="mt-2 text-sm text-white/55">Recent plays remembered</p>
              </div>
            </div>
          </div>
        </section>

        {user && recentlyPlayed.length > 0 && (
          <section className="glass-panel rounded-[34px] p-5 md:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Picked Back Up</p>
                <h3 className="hero-title mt-3 text-2xl font-bold">Recently played</h3>
              </div>
              <p className="text-sm text-white/45">Jump back into your last session</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {recentlyPlayed.map((song, index) => (
                <SongCard
                  key={`recent-${song._id || index}`}
                  song={song}
                  onPlay={handlePlaySong}
                  tag="Recent"
                />
              ))}
            </div>
          </section>
        )}

        <Artists />

        <section className="glass-panel rounded-[34px] p-5 md:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Full Catalog</p>
              <h3 className="hero-title mt-3 text-2xl font-bold">All songs</h3>
            </div>
            {!loading && (
              <p className="text-sm text-white/45">
                {allSongs?.length || 0} tracks waiting to be played
              </p>
            )}
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
          ) : allSongs?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {allSongs.map((song, index) => (
                <SongCard
                  key={song._id || index}
                  song={song}
                  onPlay={handlePlaySong}
                  tag="Play"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
              No songs available yet.
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
