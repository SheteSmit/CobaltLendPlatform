import React, { createContext, useState, useEffect } from "react"
export const WalletContext = createContext({})

const WalletProvider = ({ children }) => {
  const [walletInfo, sWalletInfo] = useState({
    networkId: null,
    web3: null,
    balance: null,
    token: null,
    account: null,
    allContracts: null,
  })
  const setWalletInfo = (data) => {
    sWalletInfo(data)
  }

  return (
    <WalletContext.Provider value={{ walletInfo, setWalletInfo }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
