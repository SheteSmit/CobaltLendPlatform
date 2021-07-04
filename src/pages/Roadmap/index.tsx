import React from 'react';
import {Container, Typography, Box, makeStyles, Card} from '@material-ui/core'
import Banner from '../../components/Banner'
import SteperCard from './SteperCard'
import { Grid } from '@material-ui/core';
import InfoPanels from '../../pages/Chromium/InfoPanels'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
  banner: {
    minHeight: 150,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    // margin: '0 1rem',
    padding: '0 1rem',
    backgroundColor: theme.palette.common.white,
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
}))


const stepData = [
  ['Launch Titanium Protocol',"Staking Platform","Chromium Exchange","Cobalt Lottery","Cobalt Chronicle" ,"Cobalt Oracle Launch","Cobalt API", "Bridge", "Integration Begins"],
  ['Chromium 2.0', '(Multiple Swaps)',
    'Lending Platform Opens for Beta Testing',
    'Voting Platform Opens For Beta Testing',
   ' NFT Generation on Multiple Platforms',
    'Decentralised Identification Foundation Begins',
    'Oracle Begins Auto-Updates',
    'Cobalt Launch Pad Begins Acceptong Applications',
    'Catalyst Preparation Begins',
    'Cobalt API Bridge Begins Cross-Chain Analysis & Execution ',
    ],
  [
    'Catalyst Fixed Listing (Escrow) Platform Beta Launches',
    'Business Registration Launches',
    'Insurance & Custodianship Launches',
    'Business NFT Distribution Facilitation Beta Launches' ],
]

export default function Roadmap() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Banner header="Roadmap"/>
      <Card className={classes.root}>
        <SteperCard />
      </Card>
      <Grid container spacing={4} wrap="wrap">
        { stepData.map((data, i) => (
          <Grid item xs={12} sm={12} md={4} lg={4} key={i}> 
            <InfoPanels title="phase 1" listItems={data} height="100%" margin={0}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}