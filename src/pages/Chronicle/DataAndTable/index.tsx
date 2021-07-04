import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Table from './Table'
import BarChart from '../../../components/Graphs/BarChart'
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    width: '100%',
    minWidth: 300,
    padding: '1rem',
    margin: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'column',
      maxWidth: '600px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    [theme.breakpoints.down('lg')]: {
      display: 'column',
    }
  },
  heading: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(24)
  },
  headerBar: {
    width: '100%',
    borderBottom: '2px solid #e2e2e2',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    alignItems: 'center'
  },
  title: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 700
  },
  subTitle: {
    paddingBottom: '1rem',
    textAlign: 'center',
    padding: '0 4rem',
    [theme.breakpoints.down('md')]: {
      padding: '0 1rem 1rem 1rem'
    }
  },
  text: {
    fontSize: '1rem',
    textAlign: 'center',
    padding: '1rem 0',
  },
  peContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  peResults: {
    height: 60,
    width: 120, 
    border: '2px solid #000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 1rem',
    [theme.breakpoints.down('md')]: {
      height: 30,
      width: 60, 
    }
  },
  peRatio: {
    width: '100%',
    display: 'flex',
    padding: '1rem 0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  peText: {
    fontSize: theme.typography.pxToRem(28),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(22),
    }
  },
  columnContainer: {
    width: '100%',
  },
  plContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportsContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const useStylesPL = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 200
  },
  profitContainer: {
    borderRight: '1px solid #000',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '4px 1rem'
  },
  lossContainer: {
    borderLeft: '1px solid #000',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '4px 1rem'
  },
  text: {
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center'
  }
}))

const useStylesReport = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  text: {
    fontSize: theme.typography.pxToRem(18),
    padding: 4,
    textAlign: 'center',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}))

interface props {
  title: string, 
  subTitle?: string,
  disclosure?: string,
  oracle?: boolean,
  nft?: boolean
}

interface plProps {
  profit: string,
  loss: string,
  header?: boolean
}

interface reportProps {
  report: string,
}

const data = [
  {
    name: 1,
    eth: 4000,
    cblt: 2400,
    amt: 2400,
  },
  {
    name: 2,
    eth: 3000,
    cblt: 1398,
    amt: 2210,
  },
  {
    name: 3,
    eth: 2000,
    cblt: 9800,
    amt: 2290,
  },
  {
    name: 4,
    eth: 2780,
    cblt: 3908,
    amt: 2000,
  },
  {
    name: 5,
    eth: 1890,
    cblt: 4800,
    amt: 2181,
  },
  {
    name: 6,
    eth: 2390,
    cblt: 3800,
    amt: 2500,
  },
  // {
  //   name: 7,
  //   uv: 3490,
  //   cblt: 4300,
  //   amt: 2100,
  // },
]

const PLRow = ({profit, loss, header}: plProps) => {
  const classes = useStylesPL()
  return (
    <Box className={classes.root} style={{borderBottom: header ? '2px solid #000' : 'none'}}>
      <Box className={classes.profitContainer}>
        <Typography className={classes.text}>{profit}</Typography>
      </Box>
      <Box className={classes.lossContainer}>
        <Typography className={classes.text}>{loss}</Typography>
      </Box>
    </Box>
  )
}


const Reports = ({report}: reportProps) => {
  const classes = useStylesReport()
  return (
    <Link to="#"className={classes.root}>
      <Typography className={classes.text}>{report}</Typography>
    </Link>
  )
}

export default function DataAndTable({title, subTitle, disclosure, oracle, nft}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBar}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.subTitle}>This a Snapshot of the Profit & Loss details of this particular part of the Cobalt Lend Ecosystem 
        Check back for more information, as we are building out the analytics now!
        </Typography>
      </Box>
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12} lg={3}>
          <Box className={classes.columnContainer}>
            {(!oracle && !nft) && (
                <Typography variant="h2" className={classes.heading}>
                Profit & Loss
                </Typography>
            )}

            {oracle && (
              <Typography variant="h2" className={classes.heading}>
              Data Anaysis
              </Typography>
            )} 

            {nft && (
              <Typography variant="h2" className={classes.heading}>
               ETH vs BTC
              </Typography>
            )}
            <Box className={classes.plContainer}>
              { nft && (
                <PLRow header profit="Verification" loss="Voting" />
              )}
              { oracle && (
                <PLRow header profit="Incoming" loss="Outgoing" />
              )}
              {
              (!oracle && !nft) && (
                <PLRow header profit="Profit" loss="Loss" />
              )}
              
              {
                (!oracle && !nft) && [0,1,2,3,4,5,6].map((i) => (
                  <PLRow profit={`Pos-${i + 1}`} loss={`Neg-${i + 1}`} />
                ))
              }
               {
                oracle && [0,1,2,3,4,5,6].map((i) => (
                  <PLRow profit={`In-${i + 1}`} loss={`Out-${i + 1}`} />
                ))
              }
               {
                nft && [0,1,2,3,4,5,6].map((i) => (
                  <PLRow profit={`ETH-${i + 1}`} loss={`BTC-${i + 1}`} />
                ))
              }
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className={classes.columnContainer}>
            <Typography variant="h2" className={classes.heading}>
            Weekly Volume
            </Typography>
            <BarChart elevation={0} injectedData={data} val1="eth" val2="cblt"/>
          </Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box className={classes.columnContainer}>
            <Typography variant="h2" className={classes.heading}>
            Quarterly Reports
            </Typography>
            
            <Box className={classes.reportsContainer}>
              {[0,1,2,3,4,5,6].map((i) => (
                <Reports report={`Report ${i + 1}`}/>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      { oracle && (
      <Box className={classes.peRatio}>
        <Box className={classes.peContainer}>
          <Typography className={classes.peText}>
            P/E Ratio
          </Typography>
          <Box className={classes.peResults}>
            <Typography className={classes.peText}>
              90
            </Typography>
          </Box>
        </Box>
      </Box>
      )}
    </Box>
  )
}