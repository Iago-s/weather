import { configureStore, createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { searches: [] };

const searchReducer = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    addSearch(state, action) {
      if (state.searches.length === 3) {
        state.searches.splice(0, 1, action.payload);
        return;
      }

      state.searches.push(action.payload);
    },
  },
});

export const searchActions = searchReducer.actions;

const store = configureStore({
  reducer: { search: searchReducer.reducer },
});

export default store;
