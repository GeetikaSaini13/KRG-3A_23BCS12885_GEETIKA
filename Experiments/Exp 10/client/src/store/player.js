import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    isPlayerDiv: false,
    songPath: "",
    songImg: "",
    // songTitle: "",
  },
  reducers: {
    setDiv(state) {
      state.isPlayerDiv = true;
    },
    closeDiv(state) {
      state.isPlayerDiv = false;
    },
    changeSong(state, action) {
      const pathOfSong = action.payload;
      state.songPath = pathOfSong;
    },
    changeImg(state, action) {
      const imgOfSong = action.payload;
      state.songImg = imgOfSong;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
