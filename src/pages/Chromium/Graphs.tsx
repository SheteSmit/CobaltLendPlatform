import { Box, Card, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ActiveShapePieChart from '../../components/Graphs/ActiveShapePieChart'
import BarChart from '../../components/Graphs/BarChart'
import FlowChart from '../../components/Graphs/FlowChart'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
    // flexWrap: 'wrap',
  },
  cards: {
    width: '100%',
    margin: '0 1rem',
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0',
    },
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  }
}))

const chartTokenomics = [
  { name: "Marketing", value: 1 },
  { name: "R&D", value: 5 },
  { name: "Staking", value: 62.20 },
  { name: "DEVS ESCROW", value: 2.75 },
  { name: "DEVS FUND", value: 5.18 },
  { name: "Chromium", value: 10.37 },
  { name: "SAFU Insurance", value: 2.59 },
  { name: "Nuls", value: 5.18 },
  { name: "Circulation", value: 1 },
]

export default function Graphs() {
  const classes = useStyles()
  return(
    <Box className={classes.root}>
      <Card className={classes.cards}>
        <ActiveShapePieChart label="Tokenomics" injectedData={chartTokenomics}/>
      </Card>
      <Card className={classes.cards}>
        <FlowChart label="Volume" injectedData={chartTokenomics}/>
      </Card>
      <Card  className={classes.cards}>
        <BarChart label="Growth Rate" injectedData={chartTokenomics} val1="eth" val2="cblt"/>
      </Card>
    </Box>
  )
}