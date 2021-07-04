import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';

interface state {
  width: number | null;
  height: number | null;
}

const localState: state = {
  width: 0,
  height: 0
}

const useStyles = makeStyles((theme) => ({
  root:{
    width: '100%', 
    height: '100%'
  }
}))

export const ContainerContext = React.createContext(localState)

interface props {
  children: React.ReactNode
}

export default function ResponsiveContainer({children}: props) {
  const windowSize = useWindowSize()
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const classes = useStyles()

  const div = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, [windowSize]);


  return (
    <ContainerContext.Provider value={{
      height,
      width
    }}>
      <div ref={div} className={classes.root}>
       
          {children}
      
      </div>
    </ContainerContext.Provider>
  )
}