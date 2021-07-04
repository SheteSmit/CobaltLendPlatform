import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import cobalt from '../../assets/cobalt.png'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Box, Card, Typography, Button, List, ListItem } from '@material-ui/core';

const StyledMenu = withStyles((theme) =>({
  paper: {
    border: '1px solid #d3d4d5',
    backgroundColor: theme.palette.secondary.dark
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    // marginRight: 10,
  },
  logo: {
    width: 80,
    height: 80
  },
  menu: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 0,
    // position: 'relative',
    // top: 0,
    // bottom: 10,
    // right: 10,
    backgroundColor: theme.palette.common.white,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    }
  },
  cards: {
    width: 500,
    // minWidth: 300,
    // height: 500,
    margin: '1rem',
    padding: '1rem'
  }, 
  

}))

interface props {
  children: React.ReactNode
}

export default function CustomizedMenus({children}: props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        <img className={classes.logo} src={cobalt} alt="logo menu" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
      >
        
        <Box className={classes.menu}>
          {children}
        </Box>
      </StyledMenu>
    </div>
  );
}