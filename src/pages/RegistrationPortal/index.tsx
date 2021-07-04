import { Box, Container, makeStyles, Tabs, Tab, Typography } from '@material-ui/core';
import React from 'react';
import RegisterForCatalyst from './RegisterForCatalyst'
import RegisterForLending from './RegisterForLending'
import RegisterToVote from './RegisterToVote'
import {useAppDispatch, useAppSelector} from '../../hooks/index'
import { changeTab } from '../../redux/reducers/registrationReducer'
import TabBar from './TabBar'
import RegistrationStickyMenu from './RegistrationStickyMenu'


const useStyles = makeStyles((theme) => ({
  root: {

  },
  banner: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(24),
    }
  },
  projectTabs: {

  },
  tabsContainer: {

  }
}))

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function RegistrationPortal() {
  const classes = useStyles()
  const dispatch = useAppDispatch();
  const {tab} = useAppSelector(state => state.registration)


  const handleFormToDisplay = (_tab: number) => {
    switch(_tab) {
      case 0: 
        return (
          <RegisterToVote />
        )
      case 1: 
        return (
          <RegisterForCatalyst />
        )
      case 2: 
        return (
          <RegisterForLending />
        )
    }
  }

  return (
    <Container maxWidth="lg">
      <Box className={classes.banner}>
        <Typography variant="h1" className={classes.header}>Registration Portal</Typography>
      </Box>
      <Box className={classes.root}>
        <TabBar />
        { handleFormToDisplay(tab) }
      </Box>
      <RegistrationStickyMenu />
    </Container>
  )
}