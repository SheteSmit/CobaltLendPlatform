import { useState, useEffect } from "react"
import Web3 from "web3"

function Web3API() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userWeb3, setUserWeb3] = useState()

  useEffect(async () => {
    await loadWeb3()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const web3instance = await window.ethereum.enable()
      setUserWeb3(web3instance)
      setIsLoggedIn(true)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      setIsLoggedIn(true)
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
    }
  }

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    userWeb3: [userWeb3, setUserWeb3],
    loadWeb3: loadWeb3,
  }
}

export default Web3API
