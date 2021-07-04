import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const registrationReducer = createSlice({
  name: 'registration',
  initialState: {
    tab: 2,
    drawerOpen: false,
  },
  reducers: {
    changeTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload
    }
  },
})

export const {changeTab, toggleDrawer} = registrationReducer.actions

export default registrationReducer