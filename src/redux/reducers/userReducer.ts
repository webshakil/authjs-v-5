import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('user'); 
    },
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, setUser } = userReducer.actions;
export default userReducer.reducer;

