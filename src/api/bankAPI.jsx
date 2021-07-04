import { useState, useEffect } from "react"
import Web3 from "web3"
import Bank from "./abis/Bank.json"

function BankAPI() {
  const [contract, setContract] = useState([])
  const [abiArr, setAbiArr] = useState([])
  const [symbol, setSymbol] = useState([])
  const [token, setToken] = useState([])
  const [input, setInput] = useState(0)
  const [coinAddress, setCoinAddress] = useState([])
  const [callback, setCallback] = useState(false)
  const [account, setAccount] = useState(false)
  const [balance, setBalance] = useState(false)
  const [web3, setWeb3] = useState(false)
  const [response, setResponse] = useState()
  const [allContracts, setAllContracts] = useState(false)

  const depositBank = async () => {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(Bank.abi, Bank.networks[netId].address)
    const amount = input * 1000000000000000000

    if (token !== "undefined") {
      try {
        const response = await token.methods.deposit().send({
          value: amount,
          from: this.state.account,
        })
        setResponse({
          response: response,
        })
      } catch (e) {
        console.log("Error, deposit: ", e)
      }
    }
  }

  const withdrawBank = async () => {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const amount = input * 1000000000000000000
    const token = new web3.eth.Contract(Bank.abi, Bank.networks[netId].address)
    if (token !== "undefined") {
      try {
        const response = await token.methods.withdraw(amount.toString()).send({
          from: account,
        })
        setResponse({
          response: response,
        })
      } catch (e) {
        console.log("Error, deposit: ", e)
      }
    }
  }

  const donateBank = async () => {
    const web3 = new Web3(window.ethereum)

    if (token !== "undefined") {
      try {
        web3.eth.sendTransaction({
          from: account,
          to: coinAddress,
          value: web3.utils.toWei("0.1", "ether"),
        })
      } catch (e) {
        console.log("Error, deposit: ", e)
      }
    }
  }

  useEffect(() => {}, [])

  return {}
}

export default BankAPI
