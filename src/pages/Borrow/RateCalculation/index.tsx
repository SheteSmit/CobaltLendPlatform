import { Box, makeStyles, Typography, Link } from '@material-ui/core';
import React from 'react';
import { Ethereum } from '../../../assets';
import cobalt from '../../../assets/cobalt.png'
import BorrowFields from './BorrowFields';
import CommonButton from '../../../components/Buttons/CommonButton'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  rateContainer: {
    // backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1rem'
    }
  },
  collateralHeader: {
    color: theme.palette.common.white,
    paddingBottom: 8
  },
  rateColateralContainer: {
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.secondary.light,
    // flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      // fontSize: theme.typography.pxToRem(28),
    }
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  collateral: {
    padding: '2rem',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  },
  collateralAmount: {
    padding: '1rem 0'
  },
  collateralNumberText: {
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(44),
    padding: '0 8px'
  },
  collateralTextButtonContainer: {
    // height: 150,
    paddingLeft: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  collateralNeededText: {
    color: theme.palette.common.white,
    paddingLeft: 8
  },
  collateralText: {
    color: theme.palette.common.white,
    padding: '1rem 0'
  },
  collateralButton: {
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  cobaltLogo: {
    width: 50,
    height: 50,
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'underline',
    padding: '0 4px',
    '&:hover': {
      color: theme.palette.common.white,
      cursor: 'pointer'
    }
  }

}))

export default function RateCalculation() {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Box className={classes.rateContainer}>
    <Typography variant="h4" className={classes.collateralHeader}>
      Loan Dynamics
    </Typography>

    <Box className={classes.rateColateralContainer}>
      <BorrowFields />
    
      <Box className={classes.collateral}>
        <Box className={classes.collateralAmount}>
          <Box className={classes.amountContainer}>
            <img src={cobalt} alt="cobalt logo" className={classes.cobaltLogo}/>
            <Typography variant="h5" className={classes.collateralNumberText}>              
              272.44
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.collateralNeededText}>
            Collateral Needed
          </Typography>
        </Box>
        <Box className={classes.collateralTextButtonContainer}>
          <Typography variant="body1" className={classes.collateralText}>
            Collateral amount based on a 1.5 X NFT Risk Score for 1st time borrowers. Loans originate for 12-36 month terms. Learn more about 
            <Link className={classes.link}>Lending Here.</Link>
          </Typography>
          <Box className={classes.collateralButton}>
            <CommonButton label="Apply for a Loan" fn={() => history.push('/registration-portal')}/>
          </Box>
        
        </Box>
       
      </Box>
      
    </Box>
  </Box>
  )
}