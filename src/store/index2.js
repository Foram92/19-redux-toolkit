import { configureStore, createSlice, createAction } from "@reduxjs/toolkit";

//here we have created new action object and add it into extraReducers to set common reducer to both movie and song slice
//this is action creater which create action object with type = 'app/reset' and payload = undefined
export const reset = createAction("app/reset");

const moviesSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
  //addMovie, removeMovie are mini reducer functions
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    }
  },
//using reset object creater so don't need to depend on movieReducer 
//in short we tell combine reducer to also take care of this extraReducers for reset purpuse; and same useing to songsReducers as well
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }
});

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    }
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }
});

//mini reducer fun loads into slice called songsSlice or moviesSlice
//songsSlice creates combined reducer which is function, songsSlice.reducer & moviesSlice.reducer is the combine reducer function
//it's get inserted into redux store
//whenever action is dispatched, that action flows into this combine reducer
//this reducer's fun job is to look every coming action
//if it's type matches with addSong or removeSong, it's going to run that mini reducer
const store = configureStore({
  reducer: {
    songs: songsSlice.reducer,
    movies: moviesSlice.reducer
  }
});

//console.log(store.getState());

export { store };
//this actions are action creater, when they called they returns action object(type & value) that we can dispatch; this save us from manually typing action objects
export const { addSong, removeSong } = songsSlice.actions;
export const { addMovie, removeMovie } = moviesSlice.actions;

//console.log(moviesSlice.actions.reset.type);    ==
//console.log(moviesSlice.actions.reset.toString());
