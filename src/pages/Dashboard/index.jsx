import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { GlobalState } from "../../GlobalState.js"
import { Box, Grid, makeStyles, Paper, Typography, Button } from "@material-ui/core"
import WalletCards from "./WalletCards"
import TressuryCard from "./TressuryCard"
import InfoCards from "./InfoCards"
import StatsCard from "./StatsCard"
import ConnectWallet from "./ConnectWallet"
import { ArrowForward } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import CommonButton from "../../components/Buttons/CommonButton"
import cobaltdark from "../../assets/cobaltdark.png"
import metamask from "../../assets/metamask.png"
import roadMap from "../../assets/roadMap.png"

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    maxWidth: "1150px",
    minWidth: "300px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    // height: 165,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: "1rem",
    color: "#fff",
    textAlign: "center",
    "@media (max-width: 600px)": {
      fontSize: theme.typography.pxToRem(14),
      padding: "0 1rem",
    },
  },
  iconContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
  },
  cardContainer: {
    width: "inherit",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
  },
  walletCardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  header: {
    fontWeight: 400,
    fontStyle: "normal",
    color: "#fff",
    opacity: 0.8,
    fontSize: "3rem",
    paddingBottom: "1rem",
    "@media (max-width: 600px)": {
      fontSize: "2rem",
    },
  },
  content: {},
  buttonCenter: {
    textTransform: "none",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonFullWidth: {
    width: "100%",
    textTransform: "none",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  comingSoonText: {
    color: theme.palette.primary.main,
    paddingTop: 8,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
}))

export default function DashBoardHome() {
  const state = useContext(GlobalState)
  const classes = useStyles()
  const history = useHistory()
  const [cryptolist, setCryptoList] = useState([])

  const getCrypto = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    try {
      const res = await axios.get(url)
      setCryptoList(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const addCbltToMetaMask = async () => {
    const tokenAddress = "0x29a99c126596c0Dc96b02A88a9EAab44EcCf511e"
    const tokenSymbol = "CBLT"
    const tokenDecimals = 18
    const tokenImage = "https://i.imgur.com/rRTK4EH.png"

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })

      if (wasAdded) {
        console.log("Thanks for your interest!")
      } else {
        console.log("Your loss!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   console.log(state)
  //   getCrypto()
  // }, [])

  // function handleChange(event) {
  //   setCrypto(event.target.value);
  //   console.log(crypto)
  // }

  return (
    <Box className={classes.container}>
      <Box className={`${classes.content} test`}></Box>
      <Box className={classes.headerContainer}>
        <Typography className={classes.header} variant="h1">
          Cobalt lend
        </Typography>
        <Typography className={classes.subHeader} variant="h1">
          Putting the Community Back in Charge of their Finances.
        </Typography>
        <Typography className={classes.comingSoonText} variant="h1">
          Coming July 4, 2021.
        </Typography>
      </Box>
      <Box className={classes.iconContainer}>
        <img src={cobaltdark} alt="cobalt lend logo" className={classes.logo} />
      </Box>
      <Box className={classes.cardContainer}>
        <Box className={classes.walletCardContainer}>
          <WalletCards
            header="Total Staking"
            primaryInfo="Total Value Locked"
            primaryData="$60,000,0000"
            secondaryInfo="CBLT Available To Stake"
            secondaryData={600000000}
            variant="Staking"
            route="staking"
          />
          <WalletCards
            header="Total Outstanding Loans"
            primaryInfo="Total Interest "
            primaryData={0}
            secondaryInfo="Interest Paid Out"
            secondaryData={0}
            variant="Lending Protocol"
            route="borrow"
          />
        </Box>
        <Box className={classes.walletCardContainer}>
          <InfoCards
            img={metamask}
            subHeader="Download the official wallet to work with Cobalt Lend, the world first decentralised treasury!"
            link
          />
          <TressuryCard />
          <InfoCards
            img={roadMap}
            header="Road Map"
            subHeader="Phase 1 In Progress"
            page
          />
        </Box>
        <Box className={classes.walletCardContainer}>
          <StatsCard
            header="Active Proposals up for Vote"
            subHeader="Total Upcoming "
            subHeaderTwo="Total Closed"
            subHeaderData={"0"}
            subHeaderTwoData={"0"}
            route="voting"
          >
            <Box className={classes.buttonContainer}>
              <CommonButton
                label="Voting"
                fullWidth
                fn={() => history.push("/voting")}
              />
            </Box>
          </StatsCard>
          <StatsCard
            header="New Hot Things"
            subHeader={`Post an add on Catalyst`}
            subHeaderTwo="Lottery for Staking"
            route="dashboard"
            person
            fire
            lottery
          >
            <Box className={classes.buttonContainer}>
              <CommonButton
                label="Add CBLT to Metamask"
                fullWidth
                fn={addCbltToMetaMask}
              />
            </Box>
          </StatsCard>
        </Box>
      </Box>
    </Box>
  )
}
