import { makeStyles, MenuItem, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  listIcon: {
    width: 30,
    height: 30,
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "row"
  },
  listText: {

  },
  comingSoon: {
    textTransform: "uppercase",
    paddingLeft: 4
  }
}))

interface props {
  image: any
  comingSoon: boolean
  type: string
}

export default function SelectField({comingSoon, image, type}: props) {
  const classes = useStyles()
  return(
    <MenuItem key={type} value={type} className={classes.listItemContainer}>
      <img src={image} className={classes.listIcon} />
      <Typography className={classes.listText}>
        {type}
      </Typography>
      { comingSoon && (
      <Typography className={classes.comingSoon}>
        Coming soon
      </Typography>
      )}
    </MenuItem>
  )
}