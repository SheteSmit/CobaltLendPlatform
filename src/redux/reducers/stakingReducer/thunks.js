import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Bank from '../../../abis/Bank.json'


import Web3 from "web3"

const web3 = new Web3(window.ethereum)

// export const addStakingData = createAsyncThunk(
//   'staking/addStakingData',
//   async () => {
//     const web3 = new Web3(window.ethereum)
//     return web3
//   }
// )

export const addNetIdThunk = createAsyncThunk(
  'blockchain/addWeb3',
  async () => {
    const netId = await web3.eth.net.getId()
    return netId
  }
)


export const addStakingData = createAsyncThunk(
  'blockchain/addStakingData',
  async (account, network) => {
    const contract = new web3.eth.Contract(Bank.abi, Bank.networks[network].address)
     const user = await contract.methods.getUser(account)
      .call({ from: account })
    return user
  }
)


// const data = async () => {
  
//   try {
//     const contract = new web3.eth.Contract(Bank.abi, Bank.networks[4].address)
//     await contract.methods.getUser(account)
//       .call({ from: account })
//       .then((res) => console.log(res))
//   } catch (e) {
//     console.log("borrow error", e)
//   }
// }