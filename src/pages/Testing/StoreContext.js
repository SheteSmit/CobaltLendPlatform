import React from "react"
import { useLocalObservable } from "mobx-react"
import { createStakingStore } from "./coinStore"

const StoreContext = React.createContext(null)

export const StoreProvider = ({ children }) => {
  const stakingStore = useLocalObservable(createStakingStore)

  return (
    <StoreContext.Provider value={stakingStore}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => React.useContext(StoreContext)
