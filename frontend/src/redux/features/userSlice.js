import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setIsLoading, setIsAuthenticated, setUser } = userSlice.actions;
export default userSlice.reducer;
