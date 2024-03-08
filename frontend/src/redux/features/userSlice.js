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
      const currentState = state;
      currentState.isLoading = action.payload;
    },
    setIsAuthenticated(state, action) {
      const currentState = state;
      currentState.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      const currentState = state;
      currentState.user = action.payload;
    },
  },
});

export const { setIsLoading, setIsAuthenticated, setUser } = userSlice.actions;
export default userSlice.reducer;
