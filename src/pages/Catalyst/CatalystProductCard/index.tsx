import { Box, Typography } from '@material-ui/core'
import { Card, makeStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    padding: '1rem',
    '&:hover': {
      cursor: 'pointer'
    }

  },
  imgContainer: {

  },
  img: {
   width: 200,
   height: 200
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // padding: '1rem'

  },
  priceText: {

  },
  descriptionText: {

  },
  locationText: {

  }
}))

interface props {
  img: any
  price: string
  description?: string
  location?: string
}

export default function CatalystProductCard({img, price, description, location}: props) {
  const classes = useStyles()
  const history = useHistory()

  const handleViewPosting = () => {
    history.push('/catalyst/user')
  }

  return (
    <Card className={classes.root} elevation={2} onClick={handleViewPosting}> 
      <Box className={classes.imgContainer}>
        <img src={img} alt={description} className={classes.img}/>
      </Box>
      <Box className={classes.infoContainer}>
        <Typography className={classes.priceText}>{price}</Typography>
        <Typography className={classes.descriptionText}>{description}</Typography>
        <Typography className={classes.locationText}>{location}</Typography>
      </Box>
    </Card>
  )
}