import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import LineChartComponent from './LineChartComponent'
import BarChart from './BarChart'
import CustomShapeBarChart from './CustomShapeBarChart'
import CustomActiveShapePieChart from './CustomActiveShapePieChart'
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid', 
    gridGap: '20px',  
    gridTemplateColumns: 'repeat(auto-fit,  minmax(300px, 2fr))',
    gridTemplateRows: 'repeat(0, 100px)'
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40
  },
  header: {
  

  },
  banner: {
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(44)
  }
}))

export default function Analytics() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Box className={classes.root}>
        <Box>
          <Box className={classes.headerContainer}>
            <Typography variant="h1" className={classes.banner}>
              Cobalt Overview
            </Typography>
          </Box>
          <Box className={classes.root}>
            <LineChartComponent label="Staking Volume "/>
            <BarChart label="CBLT Vs ETH"/>
            <CustomShapeBarChart label="Staking Contracts By Tier"/>
            <BarChart label="Chromium Volume"/>
            <CustomActiveShapePieChart label="Tokenomics"/>
            <BarChart label="Development Cost"/>
            <LineChartComponent label="Daily Active Users (DAUs)"/>
            <CustomShapeBarChart label="Point Of Interest"/>
            <PieChartWithCustomizedLabel label="Cross Platform Circulation"/>
            <LineChartComponent label="Lending Protocol Volume"/>
            <PieChartWithCustomizedLabel label="Lending Protocol YTD"/>
            <CustomActiveShapePieChart label="Total Value Locked (TVL)"/>
          </Box>
        </Box>
      </Box> 
    </Container>
  )
}