import { Box, createStyles, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTab } from '../../redux/reducers/registrationReducer';


 

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles((theme) =>({
  indicator: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.white,
    zIndex: 1001,
 
    
    '& > span': {
      width: '100%',
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.white,
    },
  },
}))((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      textTransform: 'none',
      color: theme.palette.common.white,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(1),
      '&:focus': {
        color: theme.palette.common.white,
      },
      '&$selected': {
        color: theme.palette.common.white,
      },
    
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    marginBottom: '-2px'
  },
  projectTabs: {
    borderBottom: `1px solid hsla(217, 78%, 77%, 0.95)`,
    borderOpacity: 0.7,
  }
}))

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function BrandTabs() {
  const classes = useStyles()
  const {tab} = useAppSelector(state => state.registration)
  const dispatch = useAppDispatch()

  const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
    dispatch(changeTab(value))
  }

  return(
    <Box className={classes.projectTabs}>
      <StyledTabs  value={tab} onChange={handleTabChange}>
        <StyledTab label="Register to Vote"{...a11yProps(0)}/>
        <StyledTab label="Register for Catalyst" {...a11yProps(1)}/>
        <StyledTab label="Register for lending platform"{...a11yProps(2)}/>
      </StyledTabs>
    </Box> 
  )
}