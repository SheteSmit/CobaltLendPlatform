import React, { useState } from "react"
import Gear from "../../icons/settings.svg"
import Arrow from "../../icons/arrow-down.svg"

import { MyVerticallyCenteredModal } from "../../components/tokenSelection"
import {
  Box,
  Divider,
  IconButton,
  makeStyles,
  Typography,
  SvgIcon,
  Button,
} from "@material-ui/core"
import SwapFields from "./SwapFields"
import SwapSetting from "./SwapSettings"
import CommonButton from "../../components/Buttons/CommonButton"
import { useStore } from "../Testing/StoreContext"
import { useObserver } from "mobx-react-lite"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    // minWidth: 300,
    background: "#fff",
    padding: "1rem",
    borderRadius: 8,
    margin: "1rem",
    boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
    height: '100%',
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "60px",
  },
  header: {
    color: theme.palette.primary.dark,
    fontSize: "1.25rem",
    fontWeight: 700,
  },

  button: {
    width: "100%",
    borderRadius: 10,
    textTransform: "none",
    fontSize: "1.25rem",
    border: `2px solid ${theme.palette.secondary.main}`,
    background:
      "linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)",
    "&:hover": {
      border: `2px solid ${theme.palette.secondary.main}`,
      background:
        "linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)",
    },
  },
  rootbutton: {
    padding: "1rem 0",
  },
  buttonText: {
    fontSize: "1rem",
    fontWeight: 700,
    color: theme.palette.common.white,
  },
}))

const Swap = () => {
  const [modalShow, setModalShow] = useState(false)
  const classes = useStyles()
  const stakingStore = useStore()

  React.useEffect(() => {
    const test = async () => {
      await stakingStore.loadChain()
    }
    test()
  }, [])

  return useObserver(() => (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <Typography variant="h4" className={classes.header}>
          Swap
        </Typography>
        <SwapSetting />
      </div>

      <SwapFields />

      <div className={classes.rootbutton}>
        <CommonButton
          fn={() => {
            stakingStore.direction === "down"
              ? stakingStore.buyCBLT()
              : stakingStore.sellCBLT()
          }}
          label="Swap"
          width="100%"
        />
      </div>
    </div>
  ))
}

export default Swap
