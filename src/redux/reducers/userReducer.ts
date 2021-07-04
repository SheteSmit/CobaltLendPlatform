
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface state {
  metaMask: string | undefined
}

const userReducer = createSlice({
  name: 'user',
  initialState: {
    metaMask: false,
  },
  reducers: {
    addMetaMask: (state, action: PayloadAction<boolean>) => {
      state.metaMask = action.payload;
    },
    // toggleDrawer: (state, action: PayloadAction<boolean>) => {
    //   state.drawerOpen = action.payload
    // }
  },
})

export const { addMetaMask } = userReducer.actions

export default userReducer