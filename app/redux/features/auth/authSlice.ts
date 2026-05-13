// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";

// export type TUser = {
//   id: string;
//   role: string;
//   iat: number;
//   exp: number;
// };

// type TAuthState = {
//   user: TUser | null;
//   token: string | null;
// };

// const initialState: TAuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//       }
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, updateUser, logout } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;

// // Selectors
// export const selectCurrentToken = (state: RootState) => state.auth.token;
// export const selectCurrentUser = (state: RootState) => state.auth.user;

// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
  userId: string;
  email: string;
  role: string;
  name?: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
