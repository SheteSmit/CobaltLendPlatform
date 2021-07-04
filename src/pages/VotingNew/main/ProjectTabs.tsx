import { Box, createStyles, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CommonButton from '../../../components/Buttons/CommonButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changeTab } from '../../../redux/reducers/votingReducer';


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
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '50px 0'
  },
  button: {
    textTransform: 'none',
    background: theme.palette.primary.main,
    width: 175,
    height: 50,
    borderRadius: 25,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff'
  },
  tabsContainer: {
    marginBottom: '-2px'
  },
  projectTabs: {
    borderBottom: `1px solid hsla(217, 78%, 77%, 0.95)`,
    borderOpacity: 0.7,
  },
  header: {
    fontSize: '2rem',
    color: theme.palette.common.white
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },

}))

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BrandTabs() {
  const classes = useStyles()
  const {tab} = useAppSelector(state => state.voting)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
    dispatch(changeTab(value))
  }


  return(
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.header}>
          Please select an approved project to participate in
        </Typography>
        <CommonButton label="Register To Vote" width={200} fn={() => history.push('/registration-portal')}/>
      </Box>
      <Box className={classes.projectTabs}>
        <StyledTabs  value={tab} onChange={handleTabChange}>
          <StyledTab label="Active project"{...a11yProps(0)}/>
          <StyledTab label="Inactive project" {...a11yProps(1)}/>
        </StyledTabs>
      </Box>
    </Box>
  )
}