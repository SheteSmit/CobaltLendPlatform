import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: '10px 0'
    },
    heading: {
      padding: '1rem 0',
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 'bold',
    },
    accordion: {
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      // height: 80
    }
  }),
);

interface props {
  title: string
  hiddenText: string
}

export default function SimpleAccordion({title, hiddenText}: props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {hiddenText}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}