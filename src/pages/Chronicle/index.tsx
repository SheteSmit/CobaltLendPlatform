import { makeStyles, Container, Box, Typography } from '@material-ui/core';
import React from 'react'
import DataAndTable from './DataAndTable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: '0 4rem'
  },
  topHeaders: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 760,
    paddingBottom: '40'

  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 'bold',
    color: theme.palette.common.white
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
    textAlign: 'center'
   

  }

}))

export default function Chronicle() {
  const classes = useStyles()
  return (
    <Container maxWidth="md">
      <Box className={classes.root}>
        <Box className={classes.topHeaders}>
          <Typography variant="h1" className={classes.header}>
            Chronicle
          </Typography>
          <Typography variant="h4" className={classes.subHeader}>
          A Snapshot of the Cobalt Lend Ecosystem
          </Typography>
        </Box>
        <DataAndTable title="Cobalt Lend Ecosystem"/>
        <DataAndTable title="Staking"/>
        <DataAndTable title="Lending"/>
        <DataAndTable title="Chromium"/>
        <DataAndTable title="Catalyst"/>
        <DataAndTable title="Lottery"/>
        <DataAndTable title="Oracle" oracle/>
        <DataAndTable title="NFT's" nft/>
        <DataAndTable title="Crosschain"/>
        <DataAndTable title="Partners"/>
      </Box>
    </Container>
  )
}