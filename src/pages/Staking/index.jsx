import {
  Box,
  Container,
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
} from "@material-ui/core"
import Tooltip from "@material-ui/core/Tooltip"
import HelpIcon from "@material-ui/icons/Help"
import WatchLaterIcon from "@material-ui/icons/WatchLater"
import PortfolioLi from "./PortfolioCard/PortfolioLi"
import React from "react"
import PortfolioCard from "./PortfolioCard"
import StakingCard from "./StakingCard"
import FullWidthContainer from "../../components/FullWidthContainer"
import Bank from "../../abis/Bank.json"
import { useAppDispatch, useAppSelector } from "../../hooks"
import Web3 from "web3"
import CommonButton from "../../components/Buttons/CommonButton"
import StickyHelper from "../../components/StickyHelper"
import { addContract } from "../../redux/reducers/blockchainReducer"
import {
  addAmountToStake,
  addStakePeriod,
} from "../../redux/reducers/stakingReducer"
import { addStakingData } from "../../redux/reducers/stakingReducer/thunks"
import { TestContext } from "../../NewApp"
import detectEthereumProvider from "@metamask/detect-provider"
import { useState, useEffect } from "react"
import { useStore } from "../Testing/StoreContext"
import { useObserver } from "mobx-react-lite"
import StakingStickyMenu from "./StakingStickyMenu"

const useStyles = makeStyles((theme) => ({
  parentRoot: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  root: {
    minHeight: 150,
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  header: {
    color: "#fff",
    "@media (max-width: 600px)": {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  stakingText: {
    color: "#fff",
    fontWeight: 700,
    "@media (max-width: 600px)": {
      fontSize: theme.typography.pxToRem(14),
      padding: "8px 0",
    },
  },
  stakingSubtext: {
    color: "#fff",
    "@media (max-width: 600px)": {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  text: {
    color: "#fff",
  },
  toolTip: {
    fontSize: "1.5rem",
    margin: "0 1rem",
  },
  devButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
    marginTop: 40,
    paddingBottom: 14,
  },
  container: {
    display: "flex",
    flexDirection: "row",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      // alignItems: 'center'
    },
  },
  devButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
}))

export const StakingContext = React.createContext({})

export default function Staking() {
  const stakingStore = useStore()

  React.useEffect(() => {
    const test = async () => {
      await stakingStore.loadChain()
      await stakingStore.getUserData()
      await stakingStore.handleTierData()
    }
    test()
  }, [])

  const classes = useStyles()

  return useObserver(() => (
    <Box className={classes.parentRoot}>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          <Typography variant="h1" className={classes.header}>
            Staking
          </Typography>
          <Typography variant="h6" className={classes.stakingText}>
            Stake your Ethereum in a locked Smart Contract and earn CBLT Rewards.{" "}
            {stakingStore.userBalance}
          </Typography>
          <Typography variant="h6" className={classes.stakingSubtext}>
            When you "Stake" your Ethereum, you are contributing to a community
            governed treasury while earning CBLT Tokens. Cobalt (CBLT) Tokens are the
            primary utility driving force of the Titanium Lending Protocol.
          </Typography>
        </Box>
      </Container>
      <FullWidthContainer>
        <Grid container className={classes.container} spacing={4}>
          <PortfolioCard />
          <StakingCard />
        </Grid>
        {/* <Box className={classes.devButtons}>
          <Typography>Testing Table</Typography>
          <Box>
            <Typography>Eth Currently Staking:{}</Typography>
            <Typography>Ammount of Cblt Rewards in CBLT:{} </Typography>
            <Typography>Ammount of Active Stakers:{} </Typography>
          </Box>
          <Box className={classes.devButtonContainer}>
            <CommonButton
              fn={() => stakingStore.deposit(1000000000000000000)}
              label="deposit"
              width={150}
            />
            <CommonButton
              fn={() => stakingStore.withdraw(2000000000000000000)}
              label="withdraw"
              width={150}
            />
            <CommonButton
              fn={() => stakingStore.getUserData()}
              label="get data"
              width={150}
            />
            <CommonButton
              fn={() => stakingStore.setStakingStatus()}
              label="set staking status"
              width={150}
            />
            <CommonButton
              fn={() => {
                stakingStore.getTokensInReserve()
              }}
              label="token reserver"
              width={150}
            />
            <CommonButton
              fn={() => {
                stakingStore.getEstimatedReturn()
              }}
              label="Estimated"
              width={150}
            />
            <CommonButton
              fn={() => {
                stakingStore.handleTierData()
              }}
              label="rewards"
              width={150}
            />
          </Box>
        </Box> */}
      </FullWidthContainer>
      <StakingStickyMenu />
    </Box>
  ))
}
