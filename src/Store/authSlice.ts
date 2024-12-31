import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  mobileNumber: string;
  password: string;
  isAuthenticated: boolean;
  isNewUser: boolean;
  users: { mobileNumber: string; password: string }[];
}

const initialState: AuthState = {
  mobileNumber: '',
  password: '',
  isAuthenticated: false,
  isNewUser: false,
  users: [], // Store an array of users
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ mobileNumber: string; password: string }>) => {
      const { mobileNumber, password } = action.payload;

      // Check if the mobile number already exists in the list of users
      const existingUser = state.users.find(user => user.mobileNumber === mobileNumber);

      if (existingUser) {
        // Existing user
        state.isNewUser = false;
      } else {
        // New user
        state.users.push({ mobileNumber, password });
        state.isNewUser = true;
      }

      // Update current authenticated user details
      state.mobileNumber = mobileNumber;
      state.password = password;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isNewUser = false;
      state.mobileNumber = '';
      state.password = '';
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
