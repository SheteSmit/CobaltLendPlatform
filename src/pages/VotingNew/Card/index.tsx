import { Box, Button, Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Cobalt from '../assets/cobalt.png'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
   width: '100%',
   maxWidth: 260,
   minWidth: 260,
   margin: '1rem',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
   alignItems: 'center',
   '&:hover': {
     cursor: 'pointer'
   }
  },
  image: {
    width: 280,
    height: 150
  },
  contentContainer: {
    display: 'flex',
    height: 200,
    justifyContent: 'space-between',
    flexDirection: 'column',
    // alignItems: ''
  },
  textContainer: {
    opacity: 0.8,
    maxHeight: 90,
    overflow: 'hidden'
  },
  nodeStakingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dataContainer: {
    
  },
}))

interface props {
  id?: number
  header?: string, 
  Description?: string
  nodes?:number,
  staking?:number
}

export default function Cards({
    header = "Cobalt Lend", 
    Description = "The Projects details (Short Synopsis) for the loan up for vote will be posted here", 
    nodes = 0,
    staking = 0,
    id = 2
  }: props) {
  const classes = useStyles()
  const history = useHistory()

  const handleViewProject = () => {
    history.push(`/voting/${id}`)
  }

  return (
    <Card variant="elevation" className={classes.root} onClick={handleViewProject}>
      <img src={Cobalt} className={classes.image}/>
      <CardContent className={classes.contentContainer}>
        <Box className={classes.textContainer}>
          <Typography>
            {header}
          </Typography>
          <Typography>
            {Description}
          </Typography>
        </Box>
        <Box className={classes.dataContainer}>
          <Box className={classes.nodeStakingContainer}>
            <Typography>Total votes</Typography>
            <Typography>{nodes}</Typography>
          </Box>
          <Box className={classes.nodeStakingContainer}>
            <Typography>Amount of loan</Typography>
            <Typography>{staking}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}