import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Box, Link } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleDrawer } from "../../redux/reducers/uiReducer";
import NewCustomSwitch from "./NewCustomSwitch";
// import { Reddit, Telegram, Twitter } from '@material-ui/icons';
import { Github } from "../../assets";
import Cobalt from "../../assets/cobalt.png";
import youtube from "../../assets/youtube.png";
import telegram from "../../assets/telegram.png";
import medium from "../../assets/medium.png";
import whitepaper from "../../assets/whitepaper.png";
import twitter from "../../assets/twitter.png";
import reddit from "../../assets/reddit.png";
import github from "../../assets/github.png";
import PDF from "../../assets/CobaltWP.pdf";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    isolation: "isolate",
    borderRight: "4px solid #edeff7",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    height: "100vh",
    overflow: "hidden",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  drawerOpen: {
    position: "fixed",
    zIndex: 10000,
    width: drawerWidth,
    borderRight: `4px solid #edeff7`,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflow: "hidden",
    // position: 'fixed',
    // zIndex: 10000,
    borderRight: `4px solid #edeff7`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    left: 0,
    top: 0,
  },
  switchContainer: {
    width: "100%",
    position: "fixed",
    zIndex: 10,
    bottom: 10,
    left: 0,
    // display: 'flex',
    // flexDirection: 'column',
  },
  text: {},
  li: {},
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: drawerWidth,
    overflow: "auto",
    position: "fixed",
    bottom: 10,
  },
  socialIcons: {
    height: 27,
    margin: "0 2px",
  },
  socialContianer: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirect: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    margin: "10px 0",
    paddingRight: "5px",
  },
  iconBoxContainer: {
    position: "relative",
    // marginLeft: drawerWidth,
    width: "100%",
  },
  iconContianer: {
    padding: 5,
  },
}));

interface Props {
  children: React.ReactNode;
}

export default function SideDrawer({ children }: Props) {
  const drawerOpen = useAppSelector((state) => state.ui.drawerOpen);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerPosition = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(toggleDrawer(open));
      }, 125);
    } else {
      setTimeout(() => {
        dispatch(toggleDrawer(open));
      }, 25);
    }
  }, [open]);

  return (
    <Drawer
      variant="permanent"
      // anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerPosition} className={classes.icon}>
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      {/* <Divider /> */}
      <Box className={classes.container}>{children}</Box>
      <Box className={classes.bottomContainer}>
        <Box className={classes.switchContainer}>
          <NewCustomSwitch />
        </Box>
        {drawerOpen && (
          <Box className={classes.iconBoxContainer}>
            <Box className={classes.socialContianer}>
              <Link
                href="https://t.me/cobaltlend"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={telegram} className={classes.socialIcons} />
              </Link>
              <Link
                href="https://github.com/cobaltlend"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={github} className={classes.socialIcons} />
              </Link>
              <Link
                href="https://www.reddit.com/user/cobaltlend"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={reddit} className={classes.socialIcons} />
              </Link>
              <Link
                href="https://twitter.com/CobaltLend"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={twitter} className={classes.socialIcons} />
              </Link>
            </Box>
            <Box className={classes.socialContianer}>
              <Link
                href="https://cobaltlend.com"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={Cobalt} className={classes.socialIcons} />
              </Link>
              <Link
                href="https://cobaltlend.medium.com/"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={medium} className={classes.socialIcons} />
              </Link>
              <Link
                href={PDF}
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={whitepaper} className={classes.socialIcons} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCKM6Q-FEcmHk9zb0sPy8xpA"
                target="_blank"
                rel="noopener"
                className={classes.iconContianer}
              >
                <img src={youtube} className={classes.socialIcons} />
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
