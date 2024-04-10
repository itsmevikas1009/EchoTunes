import { createSlice, current } from "@reduxjs/toolkit";

export const audioPlayer = createSlice({
    name: "audioPlayer",
    initialState: {
        currentSong: null,
        isPlaying: false,
        allSongs: []
    },
    reducers: {
        setAllSongs: (state, action) => {
            state.allSongs = action.payload;
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        }
    },
});


export const { setAllSongs, setIsPlaying, setCurrentSong } = audioPlayer.actions;

export default audioPlayer.reducer;
