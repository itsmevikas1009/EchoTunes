import { useSelector, useDispatch } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { setCurrentSong } from "../redux/reducers/audioPlayer";

const MusicPlayer = () => {
  const { songIndex, allSongs, currentSong } = useSelector(
    (state) => state.audioPlayer
  );
  // const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const nextTrack = () => {
    if (songIndex > allSongs.length) {
      dispatch(setCurrentSong(0));
    } else {
      dispatch(setCurrentSong(songIndex + 1));
    }
  };

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch(setCurrentSong(0));
    } else {
      dispatch(setCurrentSong(songIndex - 1));
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-black bg-opacity-90 ">
      <div className="flex items-center px-2 md:px-8">
        <div className="w-[100px] md:w-[300px]">
          <div className="flex items-center ">
            <img
              // src={allSongs[songIndex]?.img}
              src={currentSong?.img}
              alt=""
              className="rounded-lg h-10 md:h-14"
            />
            <div className="flex flex-col text-white justify-center pl-1 md:pl-6">
              <h1 className="md:text-lg text-sm ">{currentSong?.name}</h1>
              <h2 className="text-sm">{currentSong?.artist}</h2>
            </div>
          </div>
        </div>

        <div className=" md:w-full max-w-full">
          <div className="w-full ">
            <AudioPlayer
              src={currentSong?.song}
              onPlay={() => console.log("is playing")}
              autoPlay={true}
              showSkipControls={true}
              onClickNext={nextTrack}
              onClickPrevious={previousTrack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
