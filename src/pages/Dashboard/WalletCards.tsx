import { Box, Card, CardActions, CardContent, CardHeader, makeStyles, Typography, Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import { useHistory } from 'react-router';
import CommonButton from '../../components/Buttons/CommonButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    padding: '1rem',
    width: 560,
    minWidth: 250,
    backgroundColor: '#fff',
    borderTop: '1px solid hsl(199, 70%, 89%, .9)',
    '&::after': {
      width: 500,
      minWidth: 300,
    },
    borderRadius: 25,
    border: '1px solid #fff',
    margin: '1rem',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  },
  header: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: 700,
    color: theme.palette.secondary.light
  },
  container: {

  },
  textHeading: {
    color: theme.palette.secondary.main,
    opacity: 0.8,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700
  },
  text: {
    color: theme.palette.secondary.main,
    opacity: 0.6
  },
  button: {
    width: '100%',
    textTransform: 'none',
    display: 'flex',
    borderRadius: 12,
    justifyContent: 'space-between',
    border: `4px solid ${theme.palette.secondary.main}`,
    '&:hover': {
      border: `4px solid ${theme.palette.secondary.main}`,
    }
    // borderRadius: 12,
    // backgroundColor: theme.palette.secondary.main,
    // borderTop: `1px solid ${theme.palette.secondary.main}`
  }
}))

interface Props {
  header: string,
  primaryInfo: string,
  secondaryInfo: string,
  primaryData: number,
  secondaryData: number,
  variant: string,
  route: string
} 

export default function WalletCards({
  header, primaryInfo, primaryData, secondaryInfo, secondaryData, variant, route
}: Props) {
  const history = useHistory()
  const classes = useStyles();
  return (
    <Box className={`${classes.root} card`}>
      <CardContent>
        <Typography variant="h5" className={classes.header}>
          {header}
        </Typography>     
      </CardContent>
      <CardContent className={classes.container}>
        <Typography className={classes.textHeading}>
          {primaryInfo}
        </Typography>
        <Typography className={classes.text}>
         {primaryData}
        </Typography>
      </CardContent>
      <CardContent className={classes.container}>
        <Typography className={classes.textHeading}>
          {secondaryInfo}
        </Typography>
        <Typography className={classes.text}>
          {secondaryData}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button className={classes.button} color="primary" variant="outlined">
          <Typography align="left">
            {variant}
          </Typography>
          <ArrowForwardIcon />
        </Button> */}
        <CommonButton label={variant} fullWidth fn={() => history.push(`/${route}`)}/>
      </CardActions>
    </Box>
  )
}