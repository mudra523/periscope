import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  avatar: '',
  userName: ''
};

// both action are used as named intended to set the global state of the name and avatar.

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setAvatar, setUserName } = activateSlice.actions

export default activateSlice.reducer