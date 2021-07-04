import React from "react"
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Box, Typography } from "@material-ui/core"
import HeaderData from "./HeaderData"
import { useStore } from "../../Testing/StoreContext"
import { useObserver } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { useRef } from "react"
import QuestionToolTip from "../../../components/QuestionToolTip"

const useStyles = makeStyles((theme) => ({
  table: {
   
  },
  rowText: {
    fontSize: theme.typography.pxToRem(12),
  },
  cellText: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(14)
  },
  stakingColumn: {
    color: 'blue'
  },
  toolTip: {
    position: 'absolute',
    top: 0,
    left: 5

  }
}))

const StyledTableCell = withStyles((theme) =>
  createStyles({
    root: {

    },
    head: {
      color: theme.palette.common.black,
      // color: theme.palette.common.white,
      
    },
    body: {
      fontSize: 12,
      borderLeft: "1px solid #e2e2e2",
      // boxShadow: " 1px 1px 11px 0px rgba(17, 160, 238, 0.84);",
      
    },
  })
)(TableCell)

export default function BasicTable() {
  const classes = useStyles()
  const stakingStore = useStore()

  const testData = () => {
    console.log(stakingStore.tierData[0][0])
  }

  return useObserver(() => (
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="simple table">
          <Box className={classes.toolTip}>
            <QuestionToolTip 
            text="This table shows the available “Tiers” and the interest rate paid for each “Tier” in Cobalt (CBLT) Tokens. 
            The “Tiers that appear in RED only if there is NO room for available “Stakers” and GREEN if they have room for available “Stakers”" 
            placement="top"/>
          </Box>
     
          <TableHead>
            <TableRow>
              <HeaderData tier="Staking" range="Period" staking/>
              <HeaderData tier="Tier 1" range=".015 to .4" />
              <HeaderData tier="Tier 2" range=".4xxx1 to 2" />
              <HeaderData tier="Tier 3" range="2.xxx1 to 5" />
              <HeaderData tier="Tier 4" range="5.xx1 to 25x" />
              <HeaderData tier="Tier 5" range="25.xxx1 & UP" />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="center" style={{color: '#020873'}}>30 days</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[0][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[0][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[1][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[1][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[2][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[2][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[3][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[3][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[4][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[4][0]}%
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" style={{color: '#020873'}}>60 days</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[5][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[5][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[6][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[6][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[7][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[7][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[8][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[8][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[9][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[9][0]}%
              </StyledTableCell>
            </TableRow>
            <TableRow>
            <StyledTableCell align="center" style={{color: '#020873'}}>90 days</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[10][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[10][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[11][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[11][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[12][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[12][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[13][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[13][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[14][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[14][0]}%
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" style={{color: '#020873'}}>180 days</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[15][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[15][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[16][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[16][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[17][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[17][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[18][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[18][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[19][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[19][0]}%
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" style={{color: '#020873'}}>365 days</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[20][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[20][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[21][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[21][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[22][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[22][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[23][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[23][0]}%
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 16,
                  color: stakingStore.tierData[24][1] > 0 ? "green" : "red",
                }}
                className={classes.cellText}
              >
                {stakingStore.tierData[24][0]}%
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  ))
}
