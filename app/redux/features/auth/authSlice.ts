import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
  userId: string;
  email: string;
  role: string;
  name?: string;
  avatar?: string | null;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  tokenType?: string | null;
  expiresAt?: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  tokenType: null,
  expiresAt: null,
};

type LoginPayload = {
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
    avatar: string | null;
  };
  token: string;
  tokenType?: string;
  expiresAt?: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginPayload>) => {
      const { user, token, tokenType, expiresAt } = action.payload;

      state.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar ?? null,
      };

      state.token = token;
      state.tokenType = tokenType ?? 'Bearer';
      state.expiresAt = expiresAt ?? null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenType = null;
      state.expiresAt = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
