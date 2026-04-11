import { useEffect } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import api from "../services/api";
import {
  addToRecentlyPlayed,
  setArtistSongs,
  setCurrentSong,
  setIsPlaying,
} from "../redux/reducers/audioPlayer";
import { DEFAULT_SONG_COVER, fallbackImage } from "../utils/media";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { artistSong } = useSelector((state) => state.audioPlayer);
  const { name } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await api.get(`/song/artists/${name}`);
        if (res.success && res.data) {
          dispatch(setArtistSongs(res.data));
        }
      } catch (err) {
        console.error(err || "Error in Fetching Data");
      }
    };

    fetchSongs();
  }, [dispatch, name]);

  const handlePlaySong = (song) => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(setCurrentSong(song));
    dispatch(addToRecentlyPlayed(song));
    dispatch(setIsPlaying(true));
  };

  return (
    <AppLayout>
      <section className="glass-panel page-enter rounded-[34px] p-5 md:p-8">
        <div className="mb-6">
          <p className="eyebrow">Artist Focus</p>
          <h2 className="hero-title mt-3 text-3xl font-bold text-white md:text-4xl">
            {decodeURIComponent(name || "")}
          </h2>
          <p className="mt-3 text-sm text-white/55">
            Every available track from this artist, gathered in one view.
          </p>
        </div>

        {artistSong && artistSong.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {artistSong.map((song, index) => (
              <button
                onClick={() => handlePlaySong(song)}
                key={song._id || index}
                className="group text-left"
                type="button"
              >
                <div className="glass-card song-cover overflow-hidden rounded-[26px] p-3 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="relative overflow-hidden rounded-[20px]">
                    <img
                      src={song.img}
                      alt={`${song.name} cover`}
                      className="aspect-square w-full rounded-[20px] object-cover"
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
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center text-white/55">
            No songs available for this artist yet.
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default ArtistPage;
