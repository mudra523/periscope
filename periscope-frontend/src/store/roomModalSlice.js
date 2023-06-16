import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomModalVisibility: false,
};

export const modalVisibilitySlice = createSlice({
  name: 'roomModal',
  initialState,
  reducers: {
    roomModalVisible: (state, action) => {
      state.roomModalVisibility = action.payload;
    },
  },
})

export const { roomModalVisible } = modalVisibilitySlice.actions

export default modalVisibilitySlice.reducer