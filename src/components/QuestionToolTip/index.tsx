import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles, IconButton } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Box } from '@material-ui/core';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    // backgroundColor: '#f5f5f9',
    // color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#000',
    color: '#fff',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(16),
    border: '1px solid #dadde9',

  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline',
    zIndex: 2
  },
  icon: {
    color: 'red'
  },
  iconButton:{
    padding: 0
  }
}))

type ToolTipPlacement =  "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | "top" | undefined
type Position = "static" | "relative" | "absolute" | "sticky" | "fixed"

interface props {
  children?: React.ReactElement<any, any>;
  text?: string
  placement?: ToolTipPlacement,
  padding?: string | number
  size?: number
  position?: Position
  top?: string 
  right?: string
  bottom?: string
  left?: string
}

export default function HoverToolTip({
    text, 
    placement, 
    padding, 
    size = 20, 
    position,
    top, 
    right,
    bottom,
    left
  }: props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div  className={classes.root} style={{position: position ? position : 'relative', top: top, left: left, right: right, bottom: bottom}}>
        <CustomTooltip 
          title={text || "this is a tool tip"} 
          arrow 
          placement={placement || "top"}
          PopperProps={{
            disablePortal: false,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          
        >   
          <IconButton onClick={handleTooltipOpen} className={classes.iconButton} style={{padding: padding}}>
            <HelpOutlineIcon onClick={handleTooltipOpen} className={classes.icon} style={{width: size, height: size}}/>
          </IconButton>
        </CustomTooltip>
      </div>
    </ClickAwayListener>
  );
}