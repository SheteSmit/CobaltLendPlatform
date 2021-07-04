import { Box, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core"
import React from "react"
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import ethereum from '../../../assets/Ethereum.png'
import bitcoin from '../../../assets/bitcoin.png'
import SelectField from './SelectField'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "45%",
    padding: "2rem",
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  },
  listIcon: {
    width: 30,
    height: 30,
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "row"
  },
  listText: {

  },
  comingSoon: {
    textTransform: "uppercase",
    paddingLeft: 4
  },
  scoreOutputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  scoreBox: {
    border: '2px solid #e2e2e2',
    height: 50,
    width: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontWeight: 700,
    opacity: 0.8
  },
}))




export default function BorrowFields() {
  const [selectedDate, handleDateChange] = React.useState(new Date())
  const [loanAmmount, setLoanAmmount] = React.useState(25000)
  // const [currency, setCurrency] = React.useState("ETH")
  const classes = useStyles()
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAmmountChange = (e, value) => {
    console.log(e.target.value)
    setLoanAmmount(e.target.value)
  }

  const currencies = [
    {
      value: 'ETH',
      label: <img src={ethereum} className={classes.listIcon} />,
    },
    {
      value: 'BTC COMING SOON',
      label: <img src={bitcoin} className={classes.listIcon} />,
    },
  ];
  


  return (
    <Box className={classes.root}>
      <TextField
        helperText={loanAmmount <= 0 ? "Loan ammount not valid" : "USD Loan Amount"}
        error={loanAmmount <= 0}
        type="number"
        defaultValue={loanAmmount}
        value={loanAmmount}
        onChange={handleAmmountChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        helperText="Date Needed"
      />
        <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={currency}
        onChange={handleChange}
        helperText="Please select your currency"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label} {option.value}
          </MenuItem>
        ))}
      </TextField>
      <Box className={classes.scoreOutputContainer}>
        <Typography className={classes.scoreText}>
          NFT Risk Score % Rate
        </Typography>
        <Box className={classes.scoreBox}>
          <Typography className={classes.scoreText}>
            0
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
