import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addStakingData } from './thunks'


const stakingReducer = createSlice({
  name: 'blockchain',
  initialState: {
    period: 30,
    amount: 0,
    userStakingData: null,
    error: null
  },
  reducers: {
    addStakePeriod: (state, action: PayloadAction<number>) => {
      state.period = action.payload;
    },
    addAmountToStake: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    // addNetId: (state, action: PayloadAction<any>) => {
    //   state.netId = action.payload;
    // },
    // addWeb3Instance: (state, action: PayloadAction<any>) => {
    //   state.web3 = action.payload;
    // },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [addStakingData.fulfilled.toString()]: (state, action) => {
      // Add user to the state array
      state.userStakingData = action.payload
    },
    [addStakingData.rejected.toString()]: (state, action) => {
      // Add user to the state array
      state.error = action.payload
    },
  },
})

export const {addStakePeriod, addAmountToStake } = stakingReducer.actions

export default stakingReducer