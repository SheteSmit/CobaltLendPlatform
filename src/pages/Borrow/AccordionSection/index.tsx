import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import AccordionBlock from './AccordionBlock'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 'bold',
    color: theme.palette.common.white,
    paddingBottom: 40,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(28),
    }
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1000
  }
}))

export default function AccordionSection() {
  const classes = useStyles()
  return(
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.header}>
        Learn more about Cobalt Loan Account
      </Typography>
      <Box className={classes.accordionContainer}>
        <AccordionBlock title="How do I apply for a loan with Cobalt?" hiddenText="
         Coming Soon! Please Check Back
        "/>
        <AccordionBlock title="What is Decentralised Identification (DID)?" hiddenText="
          Coming Soon! Please Check Back
        "/>
        <AccordionBlock title="How does Cobalt Lend use Artificial Intelligence to calculate my “Risk Score”?" hiddenText="
          Coming Soon! Please Check Back
        "/>
        <AccordionBlock title="Can I “Stake” & participate in the Lending Protocol at the same time?" hiddenText="
          Coming Soon! Please Check Back
        "/>
      </Box>
    </Box>
  )
}