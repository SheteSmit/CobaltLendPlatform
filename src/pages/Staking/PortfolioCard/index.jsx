import {
  Box,
  Container,
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PortfolioLi from "./PortfolioLi";
import React from "react";
import { useAppSelector } from "../../../hooks";
import { StakingContext } from "..";
import CommonButton from "../../../components/Buttons/CommonButton";
import { useStore } from "../../Testing/StoreContext";
import { useObserver } from "mobx-react-lite";
import moment from "moment";
import blueFire from "../../../assets/blueFire.png";
import redFire from "../../../assets/redFire.png";
import ticketPercent from "../../../assets/ticketPercent.png";
import QuestionToolTip from "../../../components/QuestionToolTip";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  root: {
    width: "100%",
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  portfolioHeaderContainer: {
    padding: "1.5rem",
    borderBottom: "1px solid #e2e2e2",
  },
  portfolioHeader: {
    fontSize: "1.25rem",
  },
  accountContainer: {
    padding: "50px 0",
  },
  accountAmount: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  amount: {
    display: "flex",
    flexDirection: "row",
  },
  largeDigit: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  rightDigits: {
    display: "block",
    fontSize: "2.5rem",
    marginTop: "16px",
  },
  dollar: {
    marginTop: "4px",
    fontSize: "2.2rem",
  },
  cobaltAmount: {
    fontsize: theme.typography.pxToRem(16),
    fontweight: 700,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
  },
  ethereumStaked: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
  },
  withdrawButton: {
    paddingTop: 25,
    padding: "0 1rem",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  variants: {
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    opacity: 0.8,
    fontSize: "12px",
  },
  portfolioIcons: {
    fontSize: "50px",
    marginRight: "1rem",
  },
  listLabel: {
    fontWeight: 700,
    opacity: 0.8,
  },
  portfolioList: {
    // height: '100%'
  },
  test: {
    margin: "1rem 0",

    height: "100%",
  },
  timeStartedContainer: {},
  tierContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 1rem",
  },
  toolTipTextContainer: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function PortfolioCard() {
  const [userData, setUserData] = React.useState();
  const stakingStore = useStore();
  const classes = useStyles();

  React.useEffect(() => {
    const getData = async () => {
      await stakingStore.getUserData();
    };
    getData();
  }, []);

  const generateParsedAmmount = (_amount) => {
    if (_amount === undefined) return;
    const convertedToFloat = _amount / 1000000000000000000;
    const str_a = convertedToFloat.toString();
    const result = Number(str_a.slice(0, 6));

    console.log(result);

    return (
      <>
        {/* <span className={classes.dollar}></span> */}
        <span className={classes.largeDigit}>{result}</span>
        {/* <span className={classes.rightDigits}>.{parseInt(result[1])}</span> */}
      </>
    );
  };

  return useObserver(() => (
    <Grid item xs={12} lg={5} direction="column">
      <Grid container className={classes.container}>
        <Box className={classes.root}>
          <Box className={classes.portfolioHeaderContainer}>
            <Typography variant="h3" className={classes.portfolioHeader}>
              My Portfolio
            </Typography>
            <Typography variant="h5">Status Of My Crypto Assets</Typography>
          </Box>
          <Box className={classes.accountContainer}>
            <Box className={classes.accountAmount}>
              <Box className={classes.toolTipTextContainer}>
                <Typography variant="h4" className={classes.ethereumStaked}>
                  Ethereum Currently Staking
                </Typography>
                <QuestionToolTip
                  text="Your current Ethereum “Staking” balance and the amount of “Interest” owed to you in CBLT rewards that will be available at the end of the “Staking Contract” 
                  you are engaged in will be displayed here. (CBLT Rewards will be calculated at current market value when paid out)"
                  placement="top"
                  padding="0 0 0 4px"
                />
              </Box>
              <Box className={classes.amount}>
                <>
                  <span className={classes.largeDigit}>
                    {(stakingStore.userData[0] / 1000000000000000000).toFixed(
                      5
                    )}
                  </span>
                </>
              </Box>
              <Typography variant="h4" className={classes.cobaltAmount}>
                {/* {Math.trunc(stakingStore.userData[1] / 1000000000000000000)} CBLT */}
              </Typography>
              <Typography variant="h4" className={classes.cobaltAmount}>
                {Math.trunc(stakingStore.estimateReturnStakingUSD)} In USD
              </Typography>
              <Box className={classes.timeStartedContainer}>
                <Typography variant="h4" className={classes.variants}>
                  Contract Start Date:{" "}
                  {new Date(stakingStore.startStakingDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h4" className={classes.variants}>
                  Contract End Date:{" "}
                  {new Date(stakingStore.endStakingDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Box className={classes.withdrawButton}>
              <CommonButton
                label="Withdraw"
                fn={() => stakingStore.withdraw()}
                disabled={
                  stakingStore.startStakingDate < stakingStore.endStakingDate ||
                  (stakingStore.userData[0] / 1000000000000000000).toFixed(5) ==
                    0
                }
                width={"100%"}
              />
              <QuestionToolTip
                text="This button will automatically come “Alive” when the your “Staking Contract” has concluded and you can with or “Re-Stake” your Ethereum "
                placement="bottom"
              />
            </Box>
          </Box>
          <Box>
            <Box className={classes.tierContainer}>
              <Typography variant="h4" className={classes.listLabel}>
                Available Restaking Oportunities
              </Typography>
              <Typography variant="h4" className={classes.listLabel}>
                Spots Available
              </Typography>
            </Box>
            <List className={classes.portfolioList}>
              <PortfolioLi
                icon={<img src={blueFire} className={classes.portfolioIcons} />}
                title="Tier 5"
                subTitle="365 Days"
                titleData=""
                subTitleData="300"
              />
              <PortfolioLi
                icon={<img src={blueFire} className={classes.portfolioIcons} />}
                title="Tier 4"
                subTitle="180 Days"
                titleData=""
                subTitleData="275"
              />
              <PortfolioLi
                icon={
                  <img src={ticketPercent} className={classes.portfolioIcons} />
                }
                title="Lottery 2X Multiplier "
                subTitle={"Lottery Winner " + stakingStore.lotteryResult}
                titleData="Percentage"
                subTitleData={stakingStore.interest}
                wrap
              />
              <PortfolioLi
                icon={<img src={redFire} className={classes.portfolioIcons} />}
                title="Buy a Lottery Ticket"
                wrap
              >
                <CommonButton label="Join The Lottery" />
              </PortfolioLi>
            </List>
          </Box>
        </Box>
      </Grid>
    </Grid>
  ));
}
