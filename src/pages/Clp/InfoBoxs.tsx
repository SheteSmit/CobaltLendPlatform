import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import InfoPanels from '../../pages/Chromium/InfoPanels'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 0',

  },
  contentBox: {
    backgroundColor: theme.palette.common.white,
    height: 200,
    borderRadius: 8
  },
  title: {

  }
}))

export default function InfoBoxs() {
  const classes = useStyles()

  return (
    <Grid container spacing={4} className={classes.root} wrap="wrap">
      <Grid item xs={12} sm={12} md={4}>
        <InfoPanels
            title="Innovators"
            listItems={[
              "Tell us about yourself, your plan, and your team.",
              "Work with our Dev Team to find the right path to success.",
              "Fill out the form below and we'll do our best to follow up with those who could benefit the most from out help.",
            ]}
            />
      </Grid>
      <Grid item xs={12} md={4}>
        <InfoPanels
          title="Take your idea from conception to fruition"
          listItems={[
            "The CLP Platform is designed to help innovators around the world unitilize the “community” around them to help develop their idea into reality.",
          ]}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <Box className={classes.contentBox}> */}
          <InfoPanels
           title="Services Offered By Cobalt"
           bullets
           listItems={[
            "Lending Platform",
            "KickStarter / Grants",
            "Catalyst",
            "Mentorship & Guidance",
            "Code Review & Product Development", 
            "And much more..."
           ]}
          />
        {/* </Box> */}
      </Grid>
    </Grid>
  )
}