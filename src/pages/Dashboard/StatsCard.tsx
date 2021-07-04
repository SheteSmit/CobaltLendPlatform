import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import redFire from '../../assets/redFire.png'
import Lottery from '../../assets/lottery.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column', 
    // alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
    minWidth: 250,
    padding: '2rem 1rem',
    borderRadius: 25,
    backgroundColor: '#fff',
    borderTop: '1px solid hsl(199, 70%, 89%, .9)',
    border: '1px solid #fff',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  },
  text: {
    color: theme.palette.secondary.light,
    fontSize: '1rem'
  },
  header: {
    fontSize: '1.5rem', 
    color: theme.palette.primary.dark,
    textDecoration: 'upper-case'
  },
  link: {

  },
  linkText: {
    fontSize: '1.5rem', 
    color: theme.palette.secondary.main,
    textDecoration: 'upper-case'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textData: {
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerContianer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contianer: {
    display: 'flex',
    justifyContent: 'flex-start'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  button: {

  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 6,
  }
}))

interface Props {
  header: string;
  subHeader: string;
  subHeaderTwo: string;
  subHeaderData?: number;
  subHeaderTwoData?: number;
  children: React.ReactNode;
  route?: string
  person?: boolean
  fire?: boolean
  lottery?: boolean
}


export default function InfoCards({header, subHeader, subHeaderTwo, subHeaderData, subHeaderTwoData, children, route, person, fire, lottery}: Props) {
  const classes = useStyles()
  return (
    <Box className={`${classes.root} card`}>
      <Box className={subHeaderData ? classes.contianer : classes.centerContianer}>
        {fire && (
          <img src={redFire} alt="fire icon" className={classes.icon}/>
        )}
        <Typography className={classes.header}>
          {header}
        </Typography>
      </Box>
      
        {
          subHeaderData ? (
          <Box className={classes.dataContainer}>    
              <Typography className={classes.linkText}>
                {subHeader}
              </Typography>
          
            <Typography className={classes.linkText}>
              {subHeaderData}
            </Typography>
          </Box>
          ) : (
            <Box className={classes.centerContianer}>
              {person && (
                <PersonIcon />
              )}
              <Link to="/catalyst" className={classes.link}>
                <Typography className={classes.linkText}>
                  {subHeader}
                </Typography>
              </Link>
            </Box>
          )
        }
    
        {
          subHeaderTwoData ? (
          <Box className={classes.dataContainer}>
            <Typography className={classes.linkText}>
              {subHeaderTwo}
            </Typography>
            <Typography className={classes.linkText}>
              {subHeaderTwoData}
            </Typography>
          </Box>
          ) : (
            <Box className={classes.centerContianer}>
              {lottery && (
                <img src={Lottery} alt="lottery icon" className={classes.icon} style={{margin: 0}}/>
              )}
              <Link to="/lottery" className={classes.link}>
                <Typography className={classes.linkText}>
                  {subHeaderTwo}
                </Typography>
              </Link>
            </Box>
          )
        }
        {children}
    </Box>
  )
}