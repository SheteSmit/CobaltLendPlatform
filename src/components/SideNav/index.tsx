import SideDrawer from './SideDrawer'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles} from "@material-ui/core";
import {
  Home,
  SwapHoriz,
  Work,
  Business,
  AccountBalance,
  Description,
  EnhancedEncryption,
} from "@material-ui/icons";
import DetailsIcon from '@material-ui/icons/Details';
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeTab } from '../../redux/reducers/uiReducer'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import catalyst from '../../assets/catalyst.png'
import clp from '../../assets/clp.gif'
import lottery from '../../assets/lottery.png'
import analytics from '../../assets/analytics.gif'
import borrow from '../../assets/borrow.png'
import chronicle from '../../assets/chronicle.png'
import newHome from '../../assets/newHome.png'
import registration from '../../assets/registration.png'
import voting from '../../assets/voting.png'
import staking from '../../assets/staking.gif'
import chromium from '../../assets/chromium.gif'
import rocketAnimated from '../../assets/rocketAnimated.gif'


const styles = {
  catalyst: {
    width: 24,
    height: 24,
    transform: 'rotate(180deg)'
  },
  normal: {
    width: 24,
    height: 24,
  }
}

const SidebarItems = [
  { icon: <img src={newHome} style={styles.normal}/>, text: 'Home', link: '' },
  { icon: <img src={staking} style={styles.normal}/>,text: 'Staking', link: '/staking' },
  { icon: <img src={chromium} style={styles.normal}/>,text: 'Chromium', link: '/chromium' },
  { icon: <img src={lottery} style={styles.normal}/>, text: 'Lottery', link: '/lottery' },
  { icon: <img src={rocketAnimated} style={styles.normal}/>, text: 'CLP', link: '/clp' },
  { icon: <img src={catalyst} style={styles.catalyst}/>, text: 'Catalyst', link: '/catalyst' },
  { icon: <img src={borrow} style={styles.normal}/>, text: 'Borrow', link: '/borrow' },
  { icon: <img src={voting} style={styles.normal}/>, text: 'Voting', link: '/voting' },
  { icon: <img src={registration} style={styles.normal}/>, text: 'Registration Portal', link: '/registration-portal' },
  { icon: <img src={analytics} style={styles.normal}/>, text: 'Analytics', link: '/analytics' },
  { icon: <img src={chronicle} style={styles.normal}/>, text: 'Chronicle', link: '/chronicle' },

  // { icon: <Collections />, text: 'Collections', link: '/collections' },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    flexShrink: 0,
  },
  li: {
    // position: 'relative',
    color: theme.palette.secondary.light,
    borderLeft: `4px solid rgba(0, 0, 0, 0)`,
    '&:hover': {
      backgroundColor: '#faf9fa', 
      textDecoration: 'none'
    }
  },
  li_selected: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    color: theme.palette.primary.light,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: '#faf9fa',
      textDecoration: 'none'
    }
  },
  icon: {
    color: theme.palette.secondary.light,
    // minWidth: 0
    
  },
  icon_selected: {
    color: theme.palette.primary.light,
    // minWidth: 0
    
  },
  text: {
    height: 20,
    fontWeight: 'bold',
    // letterSpacing: '0',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  liContainer: {
    display: 'flex', 
    flexDirection: 'row'
  },
  switch: {
   
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'fixed',
    bottom: 50,

  },
  socialIcons: {
    height: 20
  },
  socialContianer: {
    position: 'relative',
    zIndex: -1,
    display: 'flex',
    flexDirect: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxContainer: {
  },
  iconContianer: {
    padding: 0
  },
  test: {
    // height: 500,
    position: 'fixed',
    bottom: 50,
    backgroundColor: 'red'
  }
})) 


export default function SideNav(){
  const tabPosition = useAppSelector((state) => state.ui.tab)
  const drawerOpen = useAppSelector((state) => state.ui.drawerOpen)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const classes = useStyles()

  const handleChangeTab = (index: number) => {
    dispatch(changeTab(index))
  }

  return (
    <SideDrawer>
      <List> 
        { SidebarItems.map((item, index) => (
        <Link to={item.link} key={item.text} className={classes.text}>
          <ListItem
            button
            onClick={() => handleChangeTab(index)}
            className={tabPosition === index ? classes.li_selected : classes.li}
          >
            <ListItemIcon className={tabPosition === index ? classes.icon_selected : classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText className={classes.text} primary={item.text} />
          </ListItem>
        </Link>
        ))}
      </List>
    </SideDrawer>
  )
} 