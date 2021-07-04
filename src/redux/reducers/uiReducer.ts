
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    tab: 0,
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

export const {changeTab, toggleDrawer} = uiReducer.actions

export default uiReducer