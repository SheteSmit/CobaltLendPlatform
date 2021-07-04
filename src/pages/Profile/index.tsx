import React from 'react';
import {Container, Box, Typography, makeStyles, Grid} from '@material-ui/core'
import ProfileCard from './ProfileCard'
import CommonButton from '../../components/Buttons/CommonButton';
import cobaltDark from '../../assets/cobaltdark.png'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  banner: {
    minHeight: 150,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    padding: '0 1rem',
    backgroundColor: theme.palette.common.white,
    // boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    boxShadow: ' inset 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '1rem'
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 80,
    maxHeight: 80,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 60,
      maxHeight: 60,
    }
  },
}))

export default function Profile() {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Box className={classes.banner}>
        <img src={cobaltDark} alt="cobalt logo" className={classes.logo}/>
        <Typography variant="h1" className={classes.header}>
          My Profile
        </Typography>
        <img src={cobaltDark} alt="cobalt logo" className={classes.logo}/>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileCard header="Staking" data={[
            {"Current Amount Staking": 123123},
            {"Contract End Date": '12/31/2023'},
            {"Pending Rewards": 123123},
          ]}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard header="Lottery" data={[
            {"Active Tickets": 123123},
            {"Winners": '12/31/2023'},
            {"Prizes": 123123},
          ]}>
            <Box className={classes.buttonContainer}>
              <CommonButton label="Buy A Ticket" fullWidth fn={() => history.push('/lottery')}/>
            </Box>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard header="My Reg Portal" data={[
            {"Pending Applications": 123123},
            {"Pending Appeals": '12/31/2023'},
            {"Stage": 1},
          ]}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard header="Lending" data={[
            {"My Loan Status": 123123},
            {"Principle": '12/31/2023'},
            {"Intrest": 123123},
            {"Monthly Payment": '12/31/2023'},
            {"Balance Owed": 123123},
          ]}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard header="Reg Profile Status" data={[
            {"Current Voting": 123123},
            {"Past Voting": '12/31/2023'},
            {"Funded Projects": 123123},
          ]}>
            <Box className={classes.buttonContainer}>
              <CommonButton label="Vote on Project" fullWidth fn={() => history.push('/voting')}/>
            </Box>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileCard header="NFTS" data={[
            {"Reg Voter": 123123},
            {"Catalyst": '12/31/2023'},
            {"Reg Borrower": 123123},
            {"Bus. Certification": 123123},
          ]}/>
        </Grid>
      </Grid>
    </Container>
  )
}