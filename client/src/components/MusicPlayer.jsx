import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { setCurrentSong } from '../redux/reducers/audioPlayer';

const MusicPlayer = () => {


    const { songIndex, allSongs, autoPlay, isPlaying } = useSelector((state) => state.audioPlayer);
    const { user } = useSelector((state) => state.auth);

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
        <div className='fixed bottom-0 w-full bg-black bg-opacity-90 ' >
            <div className='flex items-center px-8'>

                <div className='w-[25%]'>
                    <div className='flex items-center '>
                        <img src={allSongs[songIndex]?.img} alt="" height={60} width={60} className='rounded-lg' />
                        <div className='flex flex-col text-white justify-center pl-6'>
                            <h1 >{allSongs[songIndex]?.name}</h1>
                            <h2 className='text-sm'>{allSongs[songIndex]?.artist}</h2>
                        </div>
                    </div>
                </div>

                <div className='w-[75%]'>
                    <div className="w-full">
                        <AudioPlayer
                            src={allSongs[songIndex]?.song}
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
    )
}

export default MusicPlayer
