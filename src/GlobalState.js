import React, { createContext, useState } from "react"
import ContractAPI from "./api/contractAPI"
import Web3API from "./api/web3API"

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
  const [useContract, setUseContract] = useState(false)

  const state = {
    useContract: [useContract, setUseContract],
    contractAPI: ContractAPI(),
    web3API: Web3API(),
  }
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
