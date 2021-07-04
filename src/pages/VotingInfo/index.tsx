import React from 'react';
import { Box, Container, List, makeStyles, Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import cobalt from '../../assets/cobalt.png'
import Link from '@material-ui/core/Link';
import FullWidthContainer from '../../components/FullWidthContainer';
import ProjectData from './ProjectData';
import ProjectCompletionCard from './ProjectCompletionCard';
import ProjectTable from './ProjectTable'
import TokenAllocation from './TokenAllocation'

const fakeData = [
  {
    id: 2,
    logo: cobalt,
    website: 'http://cobaltlend.com',
    name: "Cobalt Lend",
    description: "This is an awesome project",
    loanSize: '$100K',
    collateral: '39%',
    riskFactor: 26,
    interestRate: '6%',
    nftVerified: true,
    projectCommunity: {
      Website: "https://cobaltlend.com",
      Twitter: "https://twitter.com/CobaltLend",
      LinkedIn: "https://linkedin.com",
      Telegram: "https://t.me/cobaltlend",
      GitHub: "https://github.com/cobaltlend"
    },
    projectIntro: "Cobalt is a Community Platform to enable global entrepreneurship",
    mainFunction: "To foster innovation and adoption of blockchain technology by empowering people to build applications without writing a single line of code"
  }
]

const useStyles = makeStyles((theme) => ({
  parentRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }, 
  root: {
    display: "flex",
    flexDirection: "column"
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  descriptionContainer: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 8
    }
  },
  descriptionText: {
    fontSize: theme.typography.pxToRem(18)
  },
  logoContainer: {
    width: '100%',
    backgroundColor: theme.palette.common.white,
    maxWidth: 320,
    height: 180,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textsAndLink: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 700,
    padding: '0 1rem'
  },
  headers: {
    height: 140,

  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 8
    },
  },
  text: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },

  link: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.common.white,
    }
  },
  topProjectDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    // '@media (minWidth: 1357px)': {
    //   margin: '0 30px'
    // },
    [theme.breakpoints.down('md')]: {
      // margin: '0 30px'
    },
    [theme.breakpoints.down('sm')]: {
      
    },
  },
  topDataArea: {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  lowerDataContainer: {

  },
  linkContainer: {
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  bottomLink: {
    color: theme.palette.common.black,
    fontWeight: 700,
    opacity: 0.8
  }
}))


function createData(type: string, data: string) {
  return { type, data };
}

const rows = [
  createData('Loan Amount', '$109.519'),
  createData('Loan Duration', '36 Months'),
  createData('Monthly Payment', '$3042'),
  createData('Interest', '$9519'),
  createData('Pay out to Individual Voter', '~$49.6'),
];

const plRows = [
  createData('Working Capital', '$275k'),
  createData('Debts & Loans', '$125k'),
  createData('Assets', '$100k'),
  createData('Overhead & expenses (Monthly)', '$5729.63'),
  createData('CBLT Collateral', '$39k'),
];

export default function VotingInfo() {
  const classes = useStyles()
  // need to get urParams Id to find in data using 2 as hard code
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString).getAll('id')[0]
  const data = fakeData.find(({id}) => id === 2)

  React.useEffect(() => {
    console.log(urlParams, 'test')
  },[urlParams])
  
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <>
      { data && (
        <Box className={classes.parentRoot}>
          <Container maxWidth="lg">
            <Box className={classes.headingContainer}>
              <Box className={classes.logoContainer}>
                <img src={data.logo} alt="logo"/>
              </Box>
              <Box className={classes.textsAndLink}>
                <Box className={classes.headers}>
                  <Typography variant="h1" className={classes.title}>
                    {data.name}
                  </Typography>
                  <Typography variant="h5" className={classes.text}>
                    <Box className={classes.descriptionContainer}>
                      <Typography className={classes.descriptionText}>Loan Size: {data.loanSize}</Typography>
                      <Typography className={classes.descriptionText}>Collateral: {data.collateral}</Typography>
                      <Typography className={classes.descriptionText}>Risk Factor: {data.riskFactor}</Typography>
                      <Typography className={classes.descriptionText}>Interest Rate: {data.interestRate}</Typography>
                      <Typography className={classes.descriptionText}>2nd Level NFT Verified: {data.nftVerified.toString()}</Typography>
                    </Box>
                  </Typography>
                </Box>
                {/* <Typography className={classes.link}>
                  <Link href={data.website} onClick={preventDefault} className={classes.link}>Website</Link>
                </Typography> */}
              </Box>
            </Box>
          </Container>
          <FullWidthContainer>
            <Box className={classes.topProjectDataContainer}>
              <Box className={classes.topDataArea}>
                <Box>
                  <ProjectData title="Project introduction" data={data.projectIntro} link={data.website}/>
                  <ProjectData title="Main function Utility & Goals" data={data.description}/>
                  <ProjectData title="Project community" data={data.projectCommunity} obj/> 
                </Box>
                <Box>
                  <ProjectCompletionCard />
                </Box>
              </Box>
              <Box className={classes.lowerDataContainer}>
                <ProjectData title="Loan Details">
                  <ProjectTable data={rows}/>
                </ProjectData>
                <ProjectData title="Operating Budget">
                  <TokenAllocation />
                </ProjectData>
                <ProjectData title="Profit & Loss / Financial Snapshot">
                  <ProjectTable data={plRows} exchange/>
                </ProjectData>
                <Box className={classes.linkContainer}>
                  <Link href="#" className={classes.bottomLink}>
                    Link to Complete Financials
                  </Link>
                </Box>
              </Box>
            </Box>
          </FullWidthContainer>
        </Box>
      )}
    </>
  )
}