import {
  Box,
  Grid,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Button } from "react-bootstrap";
import BPDTile from "./BPDTile";
import BPDRow from "./BPDRow";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExtensionIcon from "@material-ui/icons/Extension";
import CommonButton from "../../../components/Buttons/CommonButton";
import cobaltGlass from "../../../assets/cobalt.png";
import cobaltDark from "../../../assets/cobaltdark.png";
import { StakingContext } from "../index";
import StakingTable from "../StakingTable";
import Header from "./Header";
import { useStore } from "../../Testing/StoreContext";
import QuestionToolTip from "../../../components/QuestionToolTip";
import { useObserver } from "mobx-react";
import useWindowSize from "../../../hooks/useWindowSize";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    display: "flex",
  },
  topCardsContainer: {},
  topCards: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
    position: "relative",
    isolation: "isolate",
  },
  topCardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topCardTitle: {
    fontSize: "1.25rem",
  },
  topCardDigit: {
    display: "block",
    padding: "1rem 0",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
  },
  topCardText: {
    display: "block",
    textAlign: "center",
    fontSize: "1.25rem",
    fontWeight: 400,
    paddingBottom: 8,
  },
  topCardIcon: {
    width: 40,
    height: 40,
    marginRight: "8px",
  },
  bottomCard: {
    backgroundColor: theme.palette.common.white,
    height: "100%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
    // justifyContent: 'space-between'
  },
  bottomCardTopbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "1rem",
    borderBottom: "1px solid #e2e2e2",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  topHeaders: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: '5px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  },
  subHeading: {
    fontSize: theme.typography.pxToRem(14),
    "@media (max-width: 1450px)": {
      fontSize: "12px",
    },
  },
  BPDTileContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
  },
  middleSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  fieldsContianer: {
    // width: '60%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "16px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  textFieldLabel: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.dark,
    fontWeight: 700,
    position: "relative",
  },
  cbltToolTip: {
    position: "absolute",
    bottom: -2,
    right: -4,
  },
  textField: {
    padding: "1rem 0",
  },
  BPDRowContianer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    padding: "16px",
    height: "250",
    borderLeft: "1px solid #e2e2e2",
    position: "relative",
  },
  BPDRows: {
    display: "flex",
    flexDirection: "row",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "95%",
    padding: "13px 0",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #e2e2e2",
  },
  buttonSection: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-around",
    padding: "16px 20px",
  },
  test: {
    backgroundColor: "#fff",
  },
  sliderText: {
    fontWeight: 700,
    position: "relative",
  },
  comingSoonText: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(14),
    opacity: 0.8,
  },
  toolTip: {
    position: "absolute",
    top: 2,
    right: 2,
  },
}));

const slidermarks = [
  // {
  //   value: 0,
  //   // label: '0 Days',
  // },
  {
    value: 30,
    // label: '30 Days',
  },
  {
    value: 60,
    // label: '60 Days',
  },
  {
    value: 90,
    // label: '90 Days',
  },
  {
    value: 180,
    // label: '180 Days',
  },
  {
    value: 365,
    // label: '365 Days'
  },
];

const extendedSlider = [
  {
    value: 1.5,
    // label: '0 Days',
  },
  {
    value: 2,
    // label: '30 Days',
  },
  {
    value: 3,
    // label: '60 Days',
  },
  {
    value: 4,
    // label: '90 Days',
  },
  {
    value: 5,
    // label: '180 Days',
  },
];

export default function StakingCard() {
  const stakingStore = useStore();
  const { width } = useWindowSize();
  const [state, setState] = React.useState({
    stakeAmount: 0,
    period: 30,
    tier: 1,
    tokensInReserve: undefined,
    userBalance: undefined,
  });
  // const { deposit, handleTierData, userBalance, tokenInReserve } =
  //   React.useContext(StakingContext)

  React.useEffect(() => {
    const getUserData = async () => {
      await stakingStore.loadChain();
      await stakingStore.getTokensInReserve();
      await stakingStore.getUserBalance();
      setState({
        ...state,
      });
    };
    getUserData();
  }, []);

  const classes = useStyles();

  const handleStakingAmmount = (e, value) => {
    setState({
      ...state,
      stakeAmount: e.target.value,
    });

    stakingStore.getEstimatedReturn(
      e.target.value * 1000000000000000000,
      state.tier
    );
    stakingStore.tierCombination(
      e.target.value * 1000000000000000000,
      state.tier
    );
  };

  const handleDeposit = () => {
    if (state.stakeAmount)
      stakingStore.deposit(state.stakeAmount * 1000000000000000000, state.tier);
  };

  const handleTimePeriodChange = (e, value) => {
    setState({
      ...state,
      period: value,
    });
    if (
      value == 30 ||
      value == 60 ||
      value == 90 ||
      value == 180 ||
      value == 365
    ) {
      switch (value) {
        case 30:
          setState({ ...state, tier: 1 });
          break;
        case 60:
          setState({ ...state, tier: 2 });
          break;
        case 90:
          setState({ ...state, tier: 3 });
          break;
        case 180:
          setState({ ...state, tier: 4 });
          break;
        case 365:
          setState({ ...state, tier: 5 });
          break;
        default:
          return;
      }
      stakingStore.getEstimatedReturn(
        state.stakeAmount * 1000000000000000000,
        state.tier
      );
      stakingStore.tierCombination(
        state.stakeAmount * 1000000000000000000,
        state.tier
      );
    }
  };

  React.useEffect(() => {}, [state]);

  return useObserver(() => (
    <Grid item xs={12} md={12} lg={7} className={classes.root}>
      <Grid
        container
        className={classes.topCardsContainer}
        spacing={4}
        wrap="wrap"
      >
        <Grid item xs={12} md={6}>
          <Box className={classes.topCards}>
            <QuestionToolTip
              text="This is the amount of Cobalt Tokens to stake at this current moment."
              placement="top"
              position="absolute"
              top={2}
              right={4}
            />
            <Box className={classes.topCardHeader}>
              <img src={cobaltGlass} className={classes.topCardIcon} />
              <Typography variant="body2" className={classes.topCardTitle}>
                CBLT Available to Stake
              </Typography>
            </Box>
            <span className={classes.topCardDigit}>
              {stakingStore.tokenReserve / 1000000000000000000 - 20000}
            </span>
            <span className={classes.topCardText}>
              Amount of CBLT <br /> Available to Stake Right Now
            </span>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.topCards}>
            <Box className={classes.toolTip}>
              <QuestionToolTip
                text="This is your Virtual Wallet & Funds will be available to withdraw to your main wallet once you have a minimum balance of $50.00usd worth of CBLT Tokens"
                placement="right"
              />
            </Box>
            <Box className={classes.topCardHeader}>
              <img src={cobaltDark} className={classes.topCardIcon} />
              <Typography variant="body2" className={classes.topCardTitle}>
                My Rewards
              </Typography>
            </Box>
            <span className={classes.topCardDigit}>
              {Math.trunc(stakingStore.cbltReward / 1000000000000000000)}
            </span>
            <span className={classes.topCardText}>My Virtual Wallet</span>
            <CommonButton
              label="Withdraw"
              fn={() => {
                stakingStore.withdrawReward();
              }}
              disabled={stakingStore.estimateReturnUSD < 50}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box className={classes.bottomCard}>
            <Box className={classes.bottomCardTopbar}>
              <Box className={classes.topHeaders}>
                <Header />
              </Box>
            </Box>
            <Box className={classes.middleSection}>
              <Box className={classes.fieldsContianer}>
                <Box className={classes.textField}>
                  {/* <Box className={classes.toolTip}> */}

                  {/* </Box> */}

                  <Typography className={classes.textFieldLabel}>
                    Ammount of ETH
                    <QuestionToolTip
                      text="Type in the amount of Ethereum (Ether) you would like to “Stake” in the Cobalt Treasury in order to receive Cobalt (CBLT) Tokens as Rewards "
                      placement="right"
                      size={17}
                      padding="0 0 4px 2px"
                    />
                  </Typography>

                  <TextField
                    variant="outlined"
                    placeholder="Amount to stake"
                    helperText=""
                    fullWidth
                    onChange={handleStakingAmmount}
                    value={state.stakeAmount}
                  />
                </Box>

                <Box className={classes.textField}>
                  <Typography className={classes.textFieldLabel}>
                    % CBLT Paid Upfront
                    <QuestionToolTip
                      text="180 & 365 day “Stakers” receive a percentage of their rewards up front 180 day Staker will receive 25% of their CBLT rewards UPFRONT and the remaining 75% at the conclusion of their “Staking Contract”
                      365 day Staker will receive 50% of their CBLT rewards UPFRONT and the remaining 50% at the conclusion of their “Staking Contract”
                      "
                      placement="right"
                      size={17}
                      padding="0 0 4px 2px"
                      position="absolute"
                      bottom={-2}
                      right={-4}
                    />
                  </Typography>

                  <TextField
                    variant="outlined"
                    placeholder="0"
                    helperText=""
                    fullWidth
                    disabled
                    value={stakingStore.estimatedReturn}
                  />
                </Box>
              </Box>
              <Box className={classes.BPDRowContianer}>
                <StakingTable />
              </Box>
            </Box>
            <Box className={classes.sliderContainer}>
              <Typography className={classes.sliderText}>
                Please select a Staking Period
                <QuestionToolTip
                  text="Here is where you select the amount of “TIME” you would like to “STAKE” your Ether to the Cobalt Treasury. Remember these contracts are secure because they are locked, meaning you can NOT access your Ethereum until the end of the “Staking Period”."
                  placement="right"
                  size={17}
                  padding="0 0 4px 2px"
                  position="absolute"
                  bottom={0}
                  right={-20}
                />
              </Typography>
              {/* <QuestionToolTip text="Here is where you select the amount of “TIME” you would like to “STAKE” your Ether to the Cobalt Treasury. Remember these contracts are secure because they are locked, 
                meaning you can NOT access your Ethereum until the end of the “Staking Period”." placement={width < 800 ? 'bottom' : 'left'}/> */}
              <Slider
                defaultValue={30}
                className={classes.slider}
                step={null}
                max={365}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks={slidermarks}
                onChange={(e, value) => handleTimePeriodChange(e, value)}
              />
            </Box>
            <Box className={classes.sliderContainer}>
              <Typography className={classes.comingSoonText}>
                18 Months to 5 Years Coming Soon!
              </Typography>
              <Slider
                defaultValue={1.5}
                className={classes.slider}
                step={null}
                max={5}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks={extendedSlider}
                onChange={(e, value) => handleTimePeriodChange(e, value)}
                disabled
              />
            </Box>
            <Box className={classes.buttonSection}>
              <CommonButton
                label="Stake!"
                width={250}
                fn={handleDeposit}
                disabled={
                  !(state.stakeAmount >= 0.015 && stakingStore.stakeReady) ||
                  Date.now() < stakingStore.endStakingDate
                }
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  ));
}
