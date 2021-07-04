import { Box, Button, Card, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import FullWidthContainer from '../../components/FullWidthContainer'
import CommonButton from '../../components/Buttons/CommonButton'
import femaleTeacher from '../../assets/femaleTeacher.png'
import graphicsCard from '../../assets/graphicsCard.png'
import maleProfessional from '../../assets/maleProfessional.png'
import wallet from '../../assets/wallet.png'
import CatalystProductCard from './CatalystProductCard'
import iphone from '../../assets/iphone.png'
import laptop from '../../assets/laptop.png'
import ipad from '../../assets/ipad.png'
import xbox from '../../assets/xbox.png'
import espressoMachine from '../../assets/espressoMachine.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    


  },
  headerContainer: {
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  catalystContainer: {
    width: '100%',

  },
  searchContainer: {
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '1rem',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  },
  searchButton: {

  },
  header: {
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(44)
  },
  subHeader: {
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  itemContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))


const dummyContent = [
  {
    img: maleProfessional,
    title: 'Software engineer for hire',
    price: '2.5btc yearly',
  },
  {
    img: graphicsCard,
    // title: 'Gtx 1070 ti',
    price: '0.5 ETH',
    location: 'United States'
  },
  {
    img: wallet,
    // title: 'Gtx 1070 ti',
    price: '0.5 ETH',
    location: 'United States'
  },
  {
    img: femaleTeacher,
    title: 'Calc Tutor',
    price: '0.05 ETH Hourly',
    // location: 'San Diego'
  },
  {
    img: espressoMachine,
    // title: 'Calc Tutor',
    price: '2 ETH',
    location: 'San Diego'
  },
  {
    img: laptop,
    // title: 'Macbook',
    price: '0.4 ETH',
    location: 'Phoenix'
  },
  {
    img: iphone,
    // title: 'Iphone',
    price: '0.75 ETH',
    location: 'San Diego'
  },
  {
    img: ipad,
    // title: 'Iphone',
    price: '0.8 ETH',
    location: 'San Francisco'
  },
  {
    img: xbox,
    // title: 'Iphone',
    price: '0.8 ETH',
    location: 'San Francisco'
  },
]



export default function Catalyst() {
  const classes = useStyles()
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    let i = 0
    let data = []
    while(i <= 23) {
      const index = Math.floor((Math.random() * 9))
      data.push(dummyContent[index])
      i++
    }
    setData(data)

  },[])

  return (
    <Box className={classes.root}>
      <Container maxWidth="xl">
        <Box className={classes.headerContainer}>
          <Typography variant="h1" className={classes.header}>
            Catalyst
          </Typography>
          <Typography variant="h5" className={classes.subHeader}>
          List your services or goods here in exchange for crypto. 
          </Typography>
          <Typography variant="h5" className={classes.subHeader}>
          Comming Soon! 
          </Typography>
        </Box>
        </Container>
        <FullWidthContainer>
        <Box className={classes.catalystContainer}>
          {/* <Card className={classes.searchContainer} elevation={2}>
         
                <CommonButton label="Post Ad" width={150}/>
           
                <TextField 
                  variant="outlined"
                  placeholder="Job Position"
                />
           
                <TextField 
                  variant="outlined"
                  placeholder="location"
                />
           
                <TextField 
                  variant="outlined"
                  placeholder="compenstation"
                />
          
               <CommonButton label="Search" width={150}/>
        
        
          </Card> */}
          <Grid container spacing={4} className={classes.itemContainer}>
          {data.map((item) => (
            <Grid item>
              <CatalystProductCard 
                img={item.img}
                price={item.price}
                description={item.title}
                location={item.location}
              />
            </Grid>
          ))}
          </Grid>
        </Box>
      </FullWidthContainer>
    </Box>
  )
}