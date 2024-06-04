import { configureStore, createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
//this is reset function which is called in app.js file; we can write state = [], but it is not modify state but it will create new empty state which is not correct, so we will rerurn empty array to make movie list empty
    reset(state, action) {
      return [];
    }
  }
});

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    //in reducer the state is piece of state not whole state object
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
//action.payload has song, which we want to delete; it is send by handleSongRemove from store->index.js; here we are finding index no of that song to remove it
      const index = state.indexOf(action.payload);
    //this is array splice method to remove 1 index from whole state array
      state.splice(index, 1);
    }
  },
//to use same reducer as movie reset we will use this function; this will use movie/reset type of moviesResucers 
  extrareducers (builder) {
//movie/reset = moviesSlice.action.reset = moviesSlice.actions.reset.toString()  
//to undersatand more lec: 315, 316  
    builder.addCase(moviesSlice.actions.reset, (state, action) => {
      return [];
    });
  }
});

//this combine reducer fun will check every action of dispatch and match the type of that actions with mini reducers type, so we added extrareducers to songsSlice to and movie/reset; so that songsSlive will get action of movie/reset
const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    movies: moviesSlice.reducer
  }
});

//const startingState = store.getState();
//console.log(startingState);
//console.log(JSON.stringify(startingState));

// store.dispatch({
//   type: "song/addSong",
//   payload: "new song!!"
// });
//store.dispatch(songsSlice.actions.addSong("some song"));
//const finalState = store.getState();
//console.log(JSON.stringify(finalState));

export { store };
//here addSong and removeSong export from songsSlice.action
export const { addSong, removeSong } = songsSlice.actions;
export const { addMovie, removeMovie, reset } = moviesSlice.actions;

//console.log(moviesSlice.actions.reset.type);    ==
//console.log(moviesSlice.actions.reset.toString());