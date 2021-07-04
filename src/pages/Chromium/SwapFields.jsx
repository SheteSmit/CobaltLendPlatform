import {
  Box,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import React from "react"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import cobaltGlass from "../../assets/cobalt.png"
import ethereum from "../../assets/Ethereum.png"
import { useStore } from "../Testing/StoreContext"
import { useObserver } from "mobx-react-lite"
import useWindowSize from "../../hooks/useWindowSize"
import QuestionToolTip from "../../components/QuestionToolTip"

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 310,
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'space-between'
  },
  swapDropDown: {
    width: 150,
    background: theme.palette.secondary.light,
    borderRadius: 12,
    "& .MuiOutlinedInput-input": {
      // background: theme.palette.secondary.main,
      borderRadius: 12,
      // padding: '4px'
    },
    "& .MuiInputBase-root": {
      color: theme.palette.common.white,
    },
    "& .MuiInputLabel-root": {
      background: "red",
      borderRadius: 12,
      // padding: 0
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderRadius: 12,
      // pading: 0
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
  icon: {
    color: "white",
  },
  swapField: {
    // height: 150,
    padding: "1rem",
    margin: 8,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  ammount: {
    fontSize: "2rem",
    opacity: 0.8,
  },
  balance: {
    fontSize: "1.5rem",
  },
  downIconContainer: {
    position: "absolute",
    top: "42%",
    left: "45%",
    border: `2px solid ${theme.palette.secondary.main}`,
    padding: 4,
    backgroundColor: theme.palette.common.white,
    borderRadius: 50,
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
  },
  imgTop: {
    width: 40,
    height: 35,
    padding: 0,
  },
  swapIcon: {
    fontSize: "32px",
  },
  swapButton: {
    width: 30,
    height: 30,
  },
  iconWrapper: {
    width: 30,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    // height: 30,
  },
  img: {
    width: 25,
    height: 25,
  },
  menuItemText: {
    // color: 'red'
  },
}))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    width: 200,
    "&.MuiSelect-selectMenu": {
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.typography.pxToRem(8),
      },
    },
  },
}))(MenuItem)

export default function SwapFields() {
  const [swapDirection, setSwapDirection] = React.useState("up")
  const { width } = useWindowSize()
  const stakingStore = useStore()

  const [val, setVal] = React.useState({
    top: "ETH",
    bottom: "CBLT",
    numETH: 0,
  })
  const classes = useStyles()

  const handleExchangeAmmount = (e, value) => {
    stakingStore.estimateBuyCBLT(e.target.value * 1000000000000000000)
    stakingStore.numETH = e.target.value * 1000000000000000000
  }

  const handleExchangeAmmountSell = (e, value) => {
    stakingStore.estimateSellCBLT(e.target.value)
    stakingStore.numCBLT = e.target.value
  }

  const swapDirectionToggle = () => {
    setSwapDirection((state) => (state === "up" ? "down" : "up"))
    stakingStore.direction = swapDirection
    stakingStore.numETH = 0
    stakingStore.numCBLT = 0
  }

  const handleChange = (event) => {
    // setVal({
    //   ...state,
    //   [position]: event.target.value
    // });
  }

  return useObserver(() => (
    <Box className={classes.root}>
      <Box className={classes.swapField}>
        <Box className={classes.topContainer}>
          <TextField
            onChange={handleChange}
            className={classes.swapDropDown}
            variant="outlined"
            value={val.top}
            select
            SelectProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box className={classes.iconWrapper}>
                    <img src={ethereum} alt="eth" className={classes.imgTop} />
                  </Box>
                </InputAdornment>
              ),
            }}
          >
            <StyledMenuItem key="ETH" value="ETH" className={classes.menuItemText}>
              ETH
            </StyledMenuItem>
          </TextField>
          <Typography variant="body1" className={classes.ammount}>
            <TextField
              variant="outlined"
              placeholder={0}
              helperText=""
              fullWidth
              value={
                swapDirection === "up"
                  ? undefined
                  : stakingStore.numETH / 1000000000000000000
              }
              onChange={handleExchangeAmmount}
              disabled={swapDirection === "down"}
            />
          </Typography>
          <QuestionToolTip
            text="This is the token that you will be sending to the Treasury."
            position="absolute"
            placement="right"
            top={0}
            right={2}
          />
        </Box>
      </Box>
      <Box className={classes.downIconContainer}>
        <IconButton className={classes.swapButton} onClick={swapDirectionToggle} disabled>
          {swapDirection === "up" && (
            <ArrowUpwardIcon className={classes.swapIcon} />
          )}
          {swapDirection === "down" && (
            <ArrowDownwardIcon className={classes.swapIcon} />
          )}
        </IconButton>
      </Box>
      <Box className={classes.swapField}>
        <Box className={classes.topContainer}>
          <TextField
            onChange={handleChange}
            className={classes.swapDropDown}
            variant="outlined"
            value={val.bottom}
            select
            SelectProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box className={classes.iconWrapper}>
                    <img src={cobaltGlass} alt="logo" className={classes.img} />
                  </Box>
                </InputAdornment>
              ),
            }}
          >
            <StyledMenuItem key="CBLT" value="CBLT">
              CBLT
            </StyledMenuItem>
          </TextField>
          <Typography variant="body1" className={classes.ammount}>
            <TextField
              variant="outlined"
              helperText=""
              fullWidth
              value={
                swapDirection === "up"
                  ? stakingStore.numCBLT / 1000000000000000000
                  : undefined
              }
              onChange={handleExchangeAmmountSell}
              disabled={swapDirection === "up"}
            />
          </Typography>
          <QuestionToolTip
            text="This is the token that you be receiving back from the Treasury."
            position="absolute"
            placement="right"
            top={0}
            right={2}
          />
        </Box>
      </Box>
    </Box>
  ))
}
