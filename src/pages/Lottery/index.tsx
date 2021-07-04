import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import {Box, Button, Container, Grid, Link, makeStyles, TextField, Tooltip, Typography} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning';
import { useAppSelector } from '../../hooks/index'
import LaunchIcon from '@material-ui/icons/Launch';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LotteryRoundCard from './LotteryRoundCard'
import LotteryAnalytics from './LotteryAnalytics';
import LotteryHelper from './LotteryHelper'
import cobaltDark from '../../assets/cobaltdark.png'
import InfoPanels from '../Chromium/InfoPanels'

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    minHeight: 150,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    margin: '0 1rem',
    padding: '0 1rem',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    } 
  },
  heading: {
    fontSize: theme.typography.pxToRem(44),
    borderRadius: 8,
    '@media (max-width:800px)': {
      fontSize: theme.typography.pxToRem(34)
    },
    '@media (max-width:600px)': {
      fontSize: theme.typography.pxToRem(34)
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(26)
    }
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 80,
    maxHeight: 80,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }

  },
  toolTip: {
    fontSize: '1.5rem',
    margin: '0 1rem'
  },
  openIcon: {
    fontSize: 15,
    marginBottom: 2,
    textDecoration: 'underline'
  },
  text: {
    color: theme.palette.common.white
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'underline'
  },
  topLotteryDataContainer: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 0',
    margin: '0 1rem',
    backgroundColor: '#fff',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topLotteryText: {
    color: theme.palette.primary.dark
  },
  topLotteryButton: {
    textTransform: 'none'
  },
  warningIcon: {
    fontSize: 80,
    marginLeft: -80
  },
  topLotteryTextContainer: {
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column'
  },
  bottomLotteryContainers: {
    width: '100%',
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'row'
  },
  bottomImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  }
}))
export default function Lottery() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Box className={classes.headingContainer}>
        <img src={cobaltDark} alt="cobalt logo" className={classes.logo}/>
        <Box className={classes.textContainer}>
          <Typography variant="h1" className={classes.heading}>
            Cobalt Lottery
          </Typography>
          <Typography>
            For Community Members Only 
          </Typography>
          <Typography>
            Coming Soon!
          </Typography>
        </Box>
        <img src={cobaltDark} alt="cobalt logo" className={classes.logo}/>
        
      </Box>
      <Box>
      <Grid container  spacing={4} className={classes.bottomLotteryContainers}>
        <Grid item xs={12} md={6}>
          <LotteryRoundCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item container sm={12}>
            <Grid item xs={12}>
              <LotteryAnalytics />
            </Grid>
            <Grid item xs={12}>
              <InfoPanels
                title="Top Prizes"
                bullets
                margin='1rem 0'
                listItems={[
                  "Cobalt (CBLT) Token",
                  "Ethereum (ETH) Token",
                  "Binance Smart Token (BSC)",
                  "Double Staking"
                ]}
              />
            </Grid>      
          </Grid>
        </Grid>
      </Grid>
      </Box>
      <LotteryHelper />
    </Container>
  )
}