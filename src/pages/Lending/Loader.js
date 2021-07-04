import { useState, useEffect, useContext } from "react"
import Web3 from "web3"
import Bank from "../../abis/Bank.json"
import { GlobalState } from "../../GlobalState"

const Loader = () => {
  const state = useContext(GlobalState)
  // const [load, setLoad] = useState("wtf");

  useEffect(async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0])
        state.account = accounts[0]
        state.web3 = web3
      } else {
        window.alert("Please login with MetaMask")
      }

      //load contracts
      try {
        const token = await new web3.eth.Contract(
          Bank.abi,
          Bank.networks[netId].address
        )
        const coinAddress = Bank.networks[netId].address
        state.token = token
        state.coinAddress = coinAddress
      } catch (e) {
        console.log("Error", e)
        window.alert("Contracts not deployed to the current network")
      }
      state.loading = false
    } else {
      window.alert("Please install MetaMask")
    }
  }, [])
  return <div></div>
}
export default Loader
