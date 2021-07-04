import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import {Box, Button, Container, Grid, Link, makeStyles, TextField, Tooltip, Typography, List, ListItem, ListItemText, ListItemIcon, Card} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning';
import { useAppSelector } from '../../../hooks/index'
import LaunchIcon from '@material-ui/icons/Launch';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HorizontalCard from '../../../components/HorizontalCard'
import SearchField from './SearchField';
import ticketLarge from '../../../assets/ticketLarge.png'
import ticketPercent from '../../../assets/ticketPercent.png'
import blockChain from '../../../assets/blockChain.png'
import moment from 'moment';
import CommonButton from '../../../components/Buttons/CommonButton';
import QuestionToolTip from '../../../components/QuestionToolTip'


const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: 8,
    // width: '100%',
    // maxWidth: 600
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  roundContainer: {
    paddingTop: '1rem'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '1rem 0',
    padding: '1rem'
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 700,
    opacity: 0.8,
    textAlign: 'center',
    '@media (max-width:600px)':{
      fontSize: '1rem'
    }
  },
  iconContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  icons: {
    width: 50,
  },
  dateText: {
    fontSize: 12
  },
  searchField: {

  },
  searchButton: {
    marginLeft: 5
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: theme.typography.pxToRem(60),
  },
  subHeader: {
    padding: '0 1rem',
    fontWeight: 700,
    opacity: 0.8,
    textAlign: 'center',
    '@media (max-width:600px)':{
      padding: '0 2px',
      fontSize: theme.typography.pxToRem(14)
    }
  },
  dataText: {
    paddingLeft: theme.typography.pxToRem(10)
  },
  dataTextTitle: {
    fontSize: theme.typography.pxToRem(12)
  },
  dataTextSubData: {
    fontSize: theme.typography.pxToRem(22)
  },
  prizeContainer: {
    display: 'flex',
    flexDirection: 'column',

  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // maxWidth: 600
  },
  bottomButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0'
  },
  button: {

  },
  listItem: {
    borderTop: '1px solid #e2e2e2',
    borderBottom: '2px solid #e2e2e2',

  },
  listItemTextContainer: {
    display: 'flex',
    flexDirection: 'column',

  },
  textToolTipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth:120
  },
  dataHeaders: {
    fontWeight: 700,
    opacity: 0.8,
    '@media (max-width:600px)':{
      fontSize: theme.typography.pxToRem(14)
    }
  },
  winningWalletsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wallet: {
    paddingRight: 8,
    '@media (max-width:600px)':{
      fontSize: theme.typography.pxToRem(14)
    }
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchText:{
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    opacity: 0.8,
    '@media (max-width:600px)':{
      fontSize: theme.typography.pxToRem(14)
    }
  }
}))

const winningWallets = ["XX21314", "XX1151353", "XX141493"]
const winningNumbers = [12, 43, 122]

export default function Lottery() {
  const { metaMask } = useAppSelector(state => state.user)
  const classes = useStyles()

  return (
    <Box className={classes.container}>    
      <Card className={classes.topContainer} elevation={2}>
        <Typography className={classes.header}>
          Welcome to the Decentralized Lottery
        </Typography>
        <Box className={classes.iconContainer}>
          <img src={ticketLarge} alt="icons" className={classes.icons}/>
          <Typography className={classes.subHeader}>Lottery Meets The BlockChain</Typography>
          <img src={blockChain} alt="icons" className={classes.icons}/>
        </Box>
      </Card>
      <Box>
        <List>
        
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <img src={ticketLarge} alt="icons" className={classes.icons}/>
              </ListItemIcon>
              <ListItemText>
                <Box className={classes.listItemTextContainer}>
                  <Typography className={classes.dataHeaders}>Most Recent Winning Wallets</Typography>
                  <Box className={classes.winningWalletsContainer}>
                  {
                    winningWallets.map((wallet) => (    
                      <Typography key={wallet} className={classes.wallet}>{wallet}</Typography>         
                    ))
                  }
                    {/* <QuestionToolTip text="this is a toolTip" placement="right"/> */}
                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
            
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <img src={ticketLarge} alt="icons" className={classes.icons}/>
              </ListItemIcon>
              <ListItemText>
                <Box className={classes.textToolTipContainer}>
                  <Typography className={classes.dataHeaders}>Total Prizes</Typography>
                  {/* <QuestionToolTip text="this is a toolTip" placement="right" /> */}
                </Box>
              </ListItemText>
            </ListItem>
            
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <img src={ticketLarge} alt="icons" className={classes.icons}/>
              </ListItemIcon>
              <ListItemText>
              <Box className={classes.listItemTextContainer}>
                {/* <Box className={classes.textToolTipContainer}> */}
                  <Typography className={classes.dataHeaders}>Recent Winning Numbers</Typography>
                  
                {/* </Box> */}
                <Box className={classes.winningWalletsContainer}>
                {
                  winningNumbers.map((number) => (
                    <Typography key={number} className={classes.wallet}>{number}</Typography>
                  ))
                }
                <Typography>{moment().format('MM/DD/YYYY')}</Typography>
                  {/* <QuestionToolTip text="this is a toolTip" placement="right" padding="0 1rem"/>  */}
                </Box>
                
              </Box>
              </ListItemText>
            </ListItem>
        </List>
      </Box>
      <Box className={classes.tableContainer}>
        <HorizontalCard thumbnail={ticketPercent} lotteryText="Double Staking %" buttonHeight={40} toolTipPlacement="right" toolTipText="this is a tool tip"/>
        <HorizontalCard thumbnail={ticketLarge} lotteryText="Win $500 worth of CBLT" buttonHeight={40} toolTipPlacement="right" toolTipText="this is a tool tip"/>
        <HorizontalCard thumbnail={ticketLarge} lotteryText="Win $50 worth of BSC" buttonHeight={40} toolTipPlacement="right" toolTipText="this is a tool tip"/>
        <HorizontalCard thumbnail={ticketLarge} pickNumber lotteryText="Pick a winning number" buttonHeight={40} toolTipPlacement="right" toolTipText="this is a tool tip"/>
      </Box>
      <Box className={classes.bottomContainer}>
        <Typography className={classes.searchText}>Search Past Lotteries</Typography>
        <Box className={classes.searchContainer}>
          <SearchField />
          <CommonButton label="Search" width={80} height={45} radius={4}/>
        </Box>
      </Box>
    </Box>
  )
}