import { createSlice, current } from "@reduxjs/toolkit";

export const audioPlayer = createSlice({
    name: "audioPlayer",
    initialState: {
        currentSong: null,
        isPlaying: false,
        allSongs: [],
        recentlyPlayed: []
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
        },

        addToRecentlyPlayed: (state, action) => {
            let song = action.payload;
            // check if it's already in the list and remove it first
            let index = state.recentlyPlayed.findIndex(e => e._id === song._id);
            if (index !== -1) {
                state.recentlyPlayed.splice(index, 1);
            }

            //add to beginning of array
            state.recentlyPlayed.unshift(song);
            //limit length
            while (state.recentlyPlayed.length > 4) {
                state.recentlyPlayed.pop();
            }


        },

    },
});


export const { addToRecentlyPlayed, setAllSongs, setIsPlaying, setCurrentSong } = audioPlayer.actions;

export default audioPlayer.reducer;
