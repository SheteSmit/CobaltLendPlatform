import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const votingReducer = createSlice({
  name: 'voting',
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

export const {changeTab, toggleDrawer} = votingReducer.actions

export default votingReducer