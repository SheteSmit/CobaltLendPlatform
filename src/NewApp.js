/* eslint-disable */
import Web3 from "web3"
import Bank from "./abis/Bank.json"
import CHC from "./abis/CHCToken.json"
import Wood from "./abis/WoodToken.json"
import Smit from "./abis/SmitCoin.json"
import Slick from "./abis/Token.json"
import Ham from "./abis/HAM.json"
import { useState, useEffect } from "react"
import Router from "./Router/Router"
import { Link } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// import styled, { ThemeProvider } from "styled-components";
import styled from "styled-components"
import { makeStyles, ThemeProvider, Box } from "@material-ui/core"
import NavBar from "./components/NavBar"
import { theme } from "./theme/theme"
import SideNav from "./components/SideNav"
import SelectComponent from "./pages/Dashboard/ConnectWallet"
import useWindowSize from "./hooks/useWindowSize"
import { useMetaMask } from "metamask-react"
import ConnectWallet from "./pages/Dashboard/ConnectWallet"
import detectEthereumProvider from "@metamask/detect-provider"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import {
  addContract,
  setAccount,
  addNetId,
  addWeb3Instance,
} from "./redux/reducers/blockchainReducer"
import { useAppDispatch, useAppSelector } from "./hooks/"

// const theme = {
//   grayText: "#6b7774",
// };

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    paddingTop: 100,
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "hsl(238, 94%, 15%)",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
}))

export const TestContext = React.createContext()

export default function NewApp() {
  const [state, setState] = useState({
    metaMask: undefined,
    contractInstance: undefined,
    netId: undefined,
    web3: undefined,
    balance: undefined,
    accountAddress: undefined,
  })
  // const [contractTEST, setContract] = useState(() =>createNewInstance())
  const [netId, setNetId] = useState(null)
  const [account, setAccount] = useState(null)
  const [stateWeb3, setWeb3] = useState(null)
  const [sToken, setToken] = useState(null)
  const [sCoinAddress, setCoinAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [allContracts, setAllContracts] = useState(null)
  const dispatch = useAppDispatch()
  const web3 = new Web3(window.ethereum)

  const { width } = useWindowSize()

  const classes = useStyles()

  let currentAccount = null

  const getMetaMaskData = async () => {
    try {
      const accounts = await web3.eth.getAccounts()
      setState({
        ...state,
        metaMask: accounts,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMetaMaskData()
  }, [])

  async function loadBlockchainData() {
    if (typeof window.ethereum !== "undefined") {
      // ethereum,enable() is depericated
      await window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          console.error(err)
        })

      // Current ethereum object
      // const web3 = new Web3(window.ethereum)

      // Current Metamask network in use
      const netId = await web3.eth.net.getId()
      switch (netId) {
        case 1:
          console.log("This is mainnet")
          break
        case 4:
          console.log("This is the Rinkeby test network.")
          break
        case 5777:
          console.log("This is the Ganache test network.")
          break
        default:
          console.log("This is an unknown network.")
      }

      // Current Metamask Account
      const accounts = await web3.eth.getAccounts()

      if (typeof accounts[0] !== "undefined") {
        const bal = await web3.eth.getBalance(accounts[0])
        // const contract = new web3.eth.Contract(Bank.abi, Bank.networks[netId].address)
        // dispatch(addContract(contract))
        // dispatch(setAccount(accounts[0]))
        setState({
          ...state,
          web3: accounts,
          netId: accounts,
          accountAddress: accounts[0],
          balance: bal,
        })
      } else {
        window.alert("Please login with MetaMask")
      }
      loadContracts(web3)
    }
    // If Metmask is not detected
    else {
      window.alert("Please install MetaMask")
    }
  }

  // Detect Meta Mask Accounts
  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.")
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0]
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TestContext.Provider value={{ ...state }}>
          <BrowserRouter>
            <Box className={classes.container}>
              <SideNav />
              <Box className={classes.root}>
                {width > 1300 && <ConnectWallet />}
                <ConnectWallet ethereum={window.ethereum} />
                <SRouter />
              </Box>
            </Box>
          </BrowserRouter>
        </TestContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}
const SRouter = styled(Router)`
  // margin-right: 240px;
`

async function getToken(str) {
  switch (str) {
    case "CHC":
      return CHC
    case "Wood":
      return Wood
    case "Slick":
      return Slick
  }
}
