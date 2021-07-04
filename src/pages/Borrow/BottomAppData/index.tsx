import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import FullWidthContainer from '../../../components/FullWidthContainer';
import BorrowButton from '../BorrowButton';
import PhoneStack from './PhoneStack';
import CommonButton from '../../../components/Buttons/CommonButton'
import { useHistory } from 'react-router-dom';
import { theme } from '../../../theme/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
  },
  infoContaineer: {
    maxWidth: 400
  },
  header: {
    fontSize: theme.typography.pxToRem(46),
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(28),
    }
  },
  text: {
    fontSize: theme.typography.pxToRem(15),
    padding: '1rem 0'
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
}))

export default function BottomAppData() {
  const history = useHistory()
  const classes = useStyles()
  return (
    <FullWidthContainer>
      <Box className={classes.root}>
        <Box className={classes.test}>
          <Box className={classes.infoContaineer}>
            <Typography variant="h2" className={classes.header}>
              Build your credit on the Blockchain
            </Typography>
            <Typography variant="h5" className={classes.text}>
            The Cobalt Artificial Intelligence Team has devised an ingenious way of quantifying the repayment capabilities of any client, so participating in either “Staking” or “Lending” is completely safe!
            </Typography>
            <CommonButton label="Registration Portal" fn={() => history.push('/registration-portal')}/>
          </Box>
        </Box>
        <PhoneStack />
      </Box>
    </FullWidthContainer>
  )
}