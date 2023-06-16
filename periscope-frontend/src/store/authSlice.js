import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: '',
    hash: '',
  }
};

// We have two action in this reducer.
// setOtp will store hash and the phone number of the user which we will send back to server with otp to verify otp's authenticity.
// once user is autheticated we will use setAuth to set the global state of the user data and isAuth to true to give user access to other pages.

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
})

// We are deconstructing the action and then exporting it so when we import it we can directly access it.
// import statement example: import {setAuth} from /file/path/
export const { setAuth, setOtp } = authSlice.actions

// We are exporting reducer from here.
export default authSlice.reducer