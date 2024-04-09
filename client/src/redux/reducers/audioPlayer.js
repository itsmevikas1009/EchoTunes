import { createSlice } from "@reduxjs/toolkit";

export const audioPlayer = createSlice({
    name: "audioPlayer",
    initialState: {
        songIndex: 0,
        isPlaying: false,
        allSongs: [],
        autoPlay: false
    },
    reducers: {
        setAllSongs: (state, action) => {
            state.allSongs = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentSong: (state, action) => {
            state.songIndex = action.payload;
        },
        setAutoPlay: (state, action) => {
            state.autoPlay = action.payload
        }
    },
});

export const { setAllSongs, setIsPlaying, setCurrentSong, setAutoPlay } = audioPlayer.actions;

export default audioPlayer.reducer;
