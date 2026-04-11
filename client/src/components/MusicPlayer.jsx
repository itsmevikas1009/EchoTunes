import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import toast from "react-hot-toast";
import { setCurrentSong, setIsPlaying } from "../redux/reducers/audioPlayer";
import { DEFAULT_SONG_COVER, fallbackImage } from "../utils/media";

const MusicPlayer = () => {
  const { songIndex, allSongs, currentSong } = useSelector(
    (state) => state.audioPlayer
  );
  const dispatch = useDispatch();

  const nextTrack = () => {
    if (songIndex >= allSongs.length - 1) {
      dispatch(setCurrentSong(0));
    } else {
      dispatch(setCurrentSong(songIndex + 1));
    }
  };

  const previousTrack = () => {
    if (songIndex <= 0) {
      dispatch(setCurrentSong(0));
    } else {
      dispatch(setCurrentSong(songIndex - 1));
    }
  };

  const handlePlaybackError = () => {
    dispatch(setIsPlaying(false));
    toast.error("This track could not be played. The file may be missing or corrupted.");
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <div className="flex min-w-0 flex-shrink-0 items-center gap-3 md:w-[280px] md:gap-4">
        <img
          src={currentSong?.img}
          alt={currentSong?.name || "Current song"}
          className="h-12 w-12 rounded-xl object-cover shadow-lg transition-all md:h-16 md:w-16 md:rounded-2xl"
          onError={(event) => fallbackImage(event, DEFAULT_SONG_COVER)}
        />
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold text-white md:text-base">
            {currentSong?.name || "No song selected"}
          </h1>
          <h2 className="truncate text-[10px] uppercase tracking-[0.2em] text-white/45 md:text-xs">
            {currentSong?.artist || "Unknown artist"}
          </h2>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <AudioPlayer
          src={currentSong?.song}
          onPlay={() => console.log("is playing")}
          autoPlay
          showSkipControls
          onError={handlePlaybackError}
          onClickNext={nextTrack}
          onClickPrevious={previousTrack}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
