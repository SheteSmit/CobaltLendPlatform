import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@material-ui/core"
import React from "react"
import { Chart } from "react-charts"
import useDemoConfig from "./useDemoConfig"
import SelectField from "./SelectField"
import useWindowSize from "../../../hooks/useWindowSize"
import BarChart from '../../../components/Graphs/BarChart'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    width: '100%',
    // width: 600,
    // minWidth: 300,
    padding: "1rem",
    borderRadius: 8,
    // '@media (max-width: 600px)': {
    //   width: 300
    // },
    // '@media (max-width: 400px)': {
    //   width: 250
    // }
  },
  chartContainer: {
    // width: "100%",
    // minWidth: 300,
    // height: 400,
    //Temporary as the chart size needs to be managed under this point
  },
  rightHeading: {
    width: "100%",
    fontSize: "1.5rem",
    fontWeight: 700,
    opacity: 0.8
  },
  chartHeaders: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap-reverse",
  },
  chartTextsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  chartTexts: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectRange: {
    width: 186,
  },
  selectHelperText: {
    fontSize: 12,
  },
  circle: {
    backgroundColor: theme.palette.primary.main,
    width: 25,
    height: 25,
    borderRadius: "50%",
    margin: "0 5px 3px 5px",
  },
}))


const test = [
  {
    "Participation": 1544,
    "Revenue Generated": 3490,
    "Winners Paid": 4300,
    "day": 'Monday'
  },
  {
    "Participation": 1243,
    "Revenue Generated": 5400,
    "Winners Paid": 2300,
    "day": 'Tuesday'
  },
  {
    "Participation": 1544,
    "Revenue Generated": 3490,
    "Winners Paid": 4300,
    "day": 'Wednesday'
  },
  {
    "Participation": 8544,
    "Revenue Generated": 2490,
    "Winners Paid": 3300,
    "day": 'Thurday'
  },
  {
    "Participation": 3221,
    "Revenue Generated": 5390,
    "Winners Paid": 4800,
    "day": 'Friday'
  },
  {
    "Participation": 1221,
    "Revenue Generated": 1390,
    "Winners Paid": 4200,
    "day": 'Saturday'
  },
  {
    "Participation": 3221,
    "Revenue Generated": 5390,
    "Winners Paid": 4800,
    "day": 'Sunday'
  },
]

export default function LotteryAnalytics() {
  const classes = useStyles()
 
  return (
    <Box className={classes.root}>
      <Typography className={classes.rightHeading}>Lottery Analytics</Typography>
      <Box className={classes.chartHeaders}>
      </Box>
      <Box className={classes.chartContainer}>
        <BarChart elevation={0} injectedData={test} val1="Participation" val2="Revenue Generated" val3={"Winners Paid"}/>
      </Box>
    </Box>
  )
}
