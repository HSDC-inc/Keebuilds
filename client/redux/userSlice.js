import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'fake username lol',
  isLoggedIn: false, //when application starts, defaults to false
};

export const userSlice = createSlice({
  name: 'setUser',
  initialState,
  reducers: {
    changeUserState: state => {
      if (state.isLoggedIn) {
        state.isLoggedIn = false; //signs out the user
      } else {
        state.isLoggedIn = true; //signs the user in
      }
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { changeUserState, setUsername } = userSlice.actions;

export default userSlice.reducer;