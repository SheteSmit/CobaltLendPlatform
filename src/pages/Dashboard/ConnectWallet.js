import React from "react"
import {
  Box,
  makeStyles,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import { useMetaMask } from "metamask-react"
import useStringConcat from "../../hooks/useStringConcat"
import MetaMaskOnboarding from "@metamask/onboarding"
import detectEthereumProvider from "@metamask/detect-provider"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addMetaMask } from "../../redux/reducers/userReducer"
import cobalt from "../../assets/cobalt.png"
import Web3 from "web3"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: 35,
    top: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1001,
  },
  button: {
    height: 40,
    textTransform: "none",
    color: theme.palette.common.white,
    // backgroundColor: theme.palette.common.white
  },
  iconButton: {
    position: "relative",
  },
  settingsIcon: {
    fontSize: 40,
    color: theme.palette.common.white,
  },
  logo: {
    width: 25,
    height: 25,
    position: "absolute",
  },
}))


export default function ConnectWallet() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [statusMessage, setStatusMessage] = React.useState()
  const { status, connect, account } = useMetaMask()
  const [accounts, setAccounts] = React.useState([])
  const [disabled, setDisabled] = React.useState(false)
  const dispatch = useAppDispatch()
  // const [ethereum, setEthereum] = React.useState()
  const onboarding = React.useRef()

  const classes = useStyles()

  React.useEffect(() => {
    console.log(statusMessage, accounts)
  }, [statusMessage, accounts])

  React.useEffect(() => {
    // if(window.ethereum) setEthereum(new Web3(window.ethereum))
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  React.useEffect(() => {
    console.log(accounts, onboarding)
  }, [accounts, onboarding])

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        const trimString = (str, length) => {
          return str.length > length ? str.substring(0, length) + "..." : str
        }
        dispatch(addMetaMask(true))
        setStatusMessage(trimString(accounts[0], 10))
        setDisabled(true)
      } else {
        setStatusMessage("Connect")
      }
    }
  }, [accounts])

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      // const typed = newAccounts
      setAccounts(newAccounts)
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts)
      window.ethereum.on("accountsChanged", handleNewAccounts)
      return () => {
        try {
          window.ethereum.off("accountsChanged", handleNewAccounts)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }, [])

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      console.log('here')
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAccounts(newAccounts))
    } else {
      onboarding.current.startOnboarding()
    }
  }

  // React.useEffect(() => {
  //   switch(status) {
  //     case "unavailable":
  //       setStatusMessage("MetaMask not available")
  //       break;
  //     case "initializing":
  //       setStatusMessage("Synchronisation with MetaMask ongoing...")
  //       break;
  //     case "notConnected":
  //       setStatusMessage("Connect to MetaMask")
  //       break;
  //     case "connecting":
  //       setStatusMessage("Connecting...")
  //       break;
  //     case "connected": {
  //       const trimString = (str, length) => {
  //         return str.length > length ? str.substring(0, length) + "..." : str;
  //       }
  //       const trimmedAddress = trimString(account, 10)
  //       account && setStatusMessage(trimmedAddress)
  //     }
  //       break;
  //     default:
  //       return
  //   }
  // },[status, account])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        onClick={onClick}
        variant="outlined"
        color="inherit"
      >
        {statusMessage || "Install Meta Mask"}
      </Button>
      <IconButton onClick={handleClick} className={classes.iconButton}>
        <SettingsIcon className={classes.settingsIcon} />
        <img src={cobalt} alt="logo" className={classes.logo} />
      </IconButton>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/profile">
            My Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Connect</MenuItem>
        <MenuItem onClick={handleClose}>Disconnect</MenuItem>
      </Menu>
    </Box>
  )
}
