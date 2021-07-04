import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addWeb3Thunk } from './thunks'


const blockchainReducer = createSlice({
  name: 'blockchain',
  initialState: {
    contract: null,
    account: null,
    netId: null,
    web3: null
  },
  reducers: {
    addContract: (state, action: PayloadAction<any>) => {
      state.contract = action.payload;
    },
    setAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload;
    },
    addNetId: (state, action: PayloadAction<any>) => {
      state.netId = action.payload;
    },
    addWeb3Instance: (state, action: PayloadAction<any>) => {
      state.web3 = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [addWeb3Thunk.fulfilled.toString()]: (state, action) => {
      // Add user to the state array
      state.web3 = action.payload
    },
  },
})

export const {addContract, setAccount, addNetId, addWeb3Instance } = blockchainReducer.actions

export default blockchainReducer