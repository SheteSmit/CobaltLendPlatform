import React from "react"
import { Box, makeStyles, Typography, Container } from "@material-ui/core"
import Swap from "./Swap"
import InfoPanels from "./InfoPanels"
import useWindowSize from "../../hooks/useWindowSize"
import FullWidthContainer from "../../components/FullWidthContainer"
import Graphs from "./Graphs"
import CommonButton from "../../components/Buttons/CommonButton"
import { useHistory } from "react-router-dom"
import countDownPlaceHolder from "../../assets/countDownPlaceHolder.png"
import { useObserver } from "mobx-react-lite"
import { useStore } from "../Testing/StoreContext"

// import CommonButton from '../../components/Buttons/CommonButton'

const useStyles = makeStyles((theme) => ({
  parentRoot: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
  headingContainer: {
    // height: 165,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  heading: {
    fontWeight: 400,
    fontStyle: "normal",
    // color: theme.palette.common.white,
    color: "#fff",
    // opacity: 0.8,
    fontSize: theme.typography.pxToRem(64),
    paddingBottom: "1rem",
    "@media (max-width: 900px)": {
      fontSize: "3rem",
    },
    "@media (max-width: 600px)": {
      fontSize: "2rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "row",
    // height: '100%',
    alignItems: "center",
    "@media (max-width: 1200px)": {
      flexDirection: "column",
    },
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  imgContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 0",
  },
  infoImg: {
    width: "100%",
    maxWidth: 140,
  },
  infoButton: {
    // width: '100%',
    // height: '100%',
    padding: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

export default function Index() {
  const classes = useStyles()
  const { width } = useWindowSize()
  const history = useHistory()
  const stakingStore = useStore()

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

  return useObserver(() => (
    <Box className={classes.parentRoot}>
      <Container maxWidth="lg">
        <Box className={classes.headingContainer}>
          <Typography className={classes.heading} variant="h1">
            Chromium
          </Typography>
        </Box>
        {/* </Container>
        <FullWidthContainer>          */}
        {width > 1200 ? (
          <Box className={classes.content}>
            <InfoPanels
              title="Cobalt Token Utility"
              bullets
              listItems={[
                "Governance",
                "Right To Vote",
                "Collateral for loans",
                "Business Licenses & Registration",
                "Business Insurance",
                "Lottery Participation",
              ]}
            >
              <Box className={classes.infoButton}>
                <CommonButton
                  label="Add CBLT to MetaMask"
                  fn={addCbltToMetaMask}
                  width="100%"
                />
              </Box>
            </InfoPanels>
            <Swap />
            <InfoPanels
              title="Countdown"
              bullets
              listItems={[
                "Total Running Balance (TRB)",
                "When Chromium Balace Exceeds 70% Eth to CBLT",
                "Reverse Swaps will be triggered",
              ]}
            >
              <Box className={classes.imgContainer}>
                <img
                  src={countDownPlaceHolder}
                  alt="growth bar chart"
                  className={classes.infoImg}
                />
              </Box>
            </InfoPanels>
          </Box>
        ) : (
          <Box className={classes.content}>
            <Swap />
            <InfoPanels
              title="Cobalt Token Utility"
              bullets
              listItems={[
                "Governance",
                "Right To Vote",
                "Collateral for loans",
                "Business Licenses & Registration",
                "Business Insurance",
                "Registration and Insurace for Catalyst Platform",
              ]}
            >
              <Box className={classes.infoButton}>
                <CommonButton
                  label="Add CBLT to MetaMask"
                  fn={addCbltToMetaMask}
                  width="100%"
                />
              </Box>
            </InfoPanels>
            <InfoPanels
              title="Countdown"
              bullets
              listItems={[
                "Total Running Balance (TRB)",
                "When Chromium Balace Exceeds 70% Eth to CBLT",
                "Reverse Swaps will be triggered",
              ]}
            >
              <Box className={classes.imgContainer}>
                <img
                  src={countDownPlaceHolder}
                  alt="growth bar chart"
                  className={classes.infoImg}
                />
              </Box>
            </InfoPanels>
          </Box>
        )}
        <Graphs />
        <Box className={classes.buttonContainer}>
          <CommonButton
            label="To Analytics"
            width={200}
            fn={() => history.push("/analytics")}
          />
        </Box>
      </Container>
    </Box>
  ))
}
