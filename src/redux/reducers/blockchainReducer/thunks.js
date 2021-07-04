import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Web3 from "web3"

const web3 = new Web3(window.ethereum)

export const addWeb3Thunk = createAsyncThunk(
  'blockchain/addWeb3',
  async () => {
    const web3 = new Web3(window.ethereum)
    return web3
  }
)

export const addNetIdThunk = createAsyncThunk(
  'blockchain/addWeb3',
  async () => {
    const netId = await web3.eth.net.getId()
    return netId
  }
)