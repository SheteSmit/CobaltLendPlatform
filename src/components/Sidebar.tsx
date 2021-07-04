import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";
import {
  Home,
  SwapHoriz,
  Work,
  Business,
  AccountBalance,
  Description,
  Collections,
  EnhancedEncryption,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks';
import { RootState } from '../redux/store';
import { changeTab } from '../redux/reducers/uiReducer'

const SidebarItems = [
  { icon: <Home />, text: 'Home', link: '' },
  { icon: <SwapHoriz />, text: 'Chromium', link: '/chromium' },
  { icon: <Work />, text: 'Catalyst', link: '/catalyst' },
  { icon: <Business />, text: 'CLP', link: '/clp' },
  { icon: <AccountBalance />, text: 'Borrow', link: '/lend' },
  { icon: <EnhancedEncryption />, text: 'Staking', link: '/staking' },
  { icon: <EnhancedEncryption />, text: 'Community Voting', link: '/voting' },
  { icon: <Description />, text: 'Registration Portal', link: '/registration-portal' },
  // { icon: <Description />, text: 'Chronicles', link: '/chronicles' },
  // { icon: <Collections />, text: 'Collections', link: '/collections' },
];
const StyledLink = styled(Link)`
  text-decoration: none !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: inherit;
`;

// const StyledDrawer = styled(Drawer)`
//   margin: 0;
//   .MuiDrawer-paper {
//     top: auto;
//     width: 240px !important;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const StyledList = styled(List)`
  width: 100%;
  border-radius: 10px;
  margin: 0;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    flexShrink: 0,
    // borderRight:  `4px solid ${theme.palette.background.paper}`
  },
  li: {
    // position: 'relative',
   
    borderLeft: `4px solid rgba(0, 0, 0, 0)`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  li_selected: {
    // position: 'relative',
    color: theme.palette.secondary.main,
    borderLeft: `4px solid ${theme.palette.primary.light}`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  icon: {
    color: theme.palette.secondary.main,
    minWidth: 0
    
  },
  text: {
    color: theme.palette.secondary.light,
  },
  liContainer: {
    display: 'flex', 
    flexDirection: 'row'
  }
})) 

export default function CustomDrawer() {
  const tabPosition = useAppSelector((state) => state.ui.tab)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const classes = useStyles()

  const handleChangeTab = (index: number) => {
    dispatch(changeTab(index))
  }

  return (
    <Drawer variant="permanent" anchor="left" className={classes.root}>
      <StyledList> {
        SidebarItems.map((item, index) => (
          <StyledLink to={item.link} key={item.text}>
            <ListItem
              onClick={() => handleChangeTab(index)}
              className={tabPosition === index ? classes.li_selected : classes.li}
            >
              <Box className={classes.liContainer}>
                  {item.icon}
                <Typography className={classes.text} variant="body1">
                  {item.text}
                </Typography>
              </Box>
            </ListItem>
          </StyledLink>
        ))}
      </StyledList>
    </Drawer>
  );
}


