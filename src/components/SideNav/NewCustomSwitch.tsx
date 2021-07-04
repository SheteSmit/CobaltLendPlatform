import React, { useState } from "react";
import "./switch.css";
import Ethereum from '../../assets/Ethereum.png'
import BNB from '../../assets/Bnb.png'
import { makeStyles } from "@material-ui/core";
import {createStakingStore} from '../../pages/Testing/coinStore'
import { useObserver } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  bnbIcon: {
  position: 'absolute',
  right: '-11px',
  top: '-3px',
  width: '50px',
  height: '35px',
  '@media (max-width: 600px)': {
    right: '-12px',
    top: '-3px',
    width: '45px',
    height: '30px',
   }
  },
  ethIcon: {
    position: 'absolute',
    left: '-7px',
    top: '-3px',
    width: '40px',
    height: '35px',
  '@media (max-width: 600px)': {
    left: '-4px',
    top: '-3px',
    width: '30px',
    height: '30px',
   }
  }
}))

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);
  const stakingStore = createStakingStore()
  const classes = useStyles()
  const onToggle = () => {
    stakingStore.changeChain()
    setIsToggled(!isToggled)
  };

  React.useEffect(() => {
    switch(stakingStore.chainId) {
      case 'eth': 
        setIsToggled(false)
        break;
      case 'bnb': 
        setIsToggled(true)
        break;
      default: return
    }
  },[])

 

  return useObserver(() => (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      {/* data-yes={(<Ethereum />)} data-no={(<img src={BNB} />)} */}
      <span className="switch">
        {!isToggled && (
          <img src={Ethereum} className={classes.ethIcon}/>
        )}
        {isToggled && (     
          <img src={BNB} className={classes.bnbIcon}/>
        )}
      </span>
    </label>
  ));
}
export default ToggleSwitch;

// import React, { Component } from 'react';
// import './switch.scss'

// interface props {
//   name: string
// }

// export default function ToggleSwitch({name}: props) {
//     return (
//       <div className="toggle-switch">
//         <input
//           type="checkbox"
//           className="toggle-switch-checkbox"
//           name={name}
//           id={name}
//         />
//         <label className="toggle-switch-label" htmlFor={name}>
//           <span className="toggle-switch-inner" data-yes="yes" data-no="no"/>
//           <span className="toggle-switch-switch" />
//         </label>
//       </div>
//     );
// }

