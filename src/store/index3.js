import { configureStore } from "@reduxjs/toolkit";
import { songsReducer, addSong, removeSong } from "./slices/songsSlice";
import { moviesReducer, addMovie, removeMovie } from "./slices/moviesSlice";
import { reset } from "./action";

const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer
  }
});

//console.log(store.getState());

export { store };
export { reset, addSong, removeSong, addMovie, removeMovie };

//console.log(moviesSlice.actions.reset.type);    ==
//console.log(moviesSlice.actions.reset.toString());

//this file creats store->action.js, store->slices->moviesSlice & songsSlice
//this is file organization which is function based 
