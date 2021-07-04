import React from "react"
import { useStore } from "./StoreContext"
import Token from "../../abis/Token.json"
import Web3 from "web3"
import detectEthereumProvider from "@metamask/detect-provider"

export default function Testing() {
  const stakingStore = useStore()

  React.useEffect(() => {
    stakingStore.loadChain()
  }, [])

  const loadContract = async () => {
    const web3 = new Web3(window.ethereum)
    const provider = await detectEthereumProvider()

    var Contract = require("web3-eth-contract")
    var tokenContractAddress = "0x29a99c126596c0Dc96b02A88a9EAab44EcCf511e"
    stakingStore.stakingContract = await new web3.eth.Contract(
      Token,
      tokenContractAddress
    )
    console.log(stakingStore.stakingContract)
  }

  const tryContract = async () => {
    const response = await stakingStore.stakingContract.methods
      .approve(
        "0xd613968cc87B97Eaa97EF5394640Ec5362dF8A4A",
        "100000000000000000000000000000000"
      )
      .send({
        from: "0x7fB9B032CDd38D3945B03aa0d62AB471E4b2E890",
      })
    console.log(response)
  }

  return (
    <div>
      <button
        onClick={() => {
          loadContract()
        }}
      >
        Change change
      </button>
      <button
        onClick={() => {
          tryContract()
        }}
      >
        Change change
      </button>
    </div>
  )
}
