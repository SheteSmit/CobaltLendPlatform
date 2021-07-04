import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 250,
    padding: '1rem',
    borderRadius: 25,
    backgroundColor: '#fff',
    borderTop: '1px solid hsl(199, 70%, 89%, .9)',
    border: '1px solid #fff',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    '&:hover': {
      backgroundColor: '#fff'
    },
    textTransform: 'none'
  },
  text: {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  subText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  header: {
    fontSize: '2rem', 
    color: '#fff', 
    textDecoration: 'upper-case'
  },
  iconContainer: {
    display: 'flex', 
    justifyContent: 'flex-end',
    width: '100%',
  },
  icon: {
    color: theme.palette.common.white,
  },
  img: {
    width: 80,
    height: 80,
    paddingBottom: 8
  },
  imgContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

interface Props {
  header: string;
  subHeader: string;
  img?: string
  disabled?: boolean
  link?: string
  page?: string
}

export default function InfoCards({header, subHeader, img, disabled, link, page}: Props) {
  const history = useHistory()
  const classes = useStyles()

  const handleButtonClicked = () => {
    if(link) {
      window.open('http://metamask.io','_blank')
    }
    if(page) {
      history.push('/roadmap')
    }
  }

  return (
    <Button className={`${classes.root} card`} disabled={disabled ? true : false} onClick={handleButtonClicked}>
      <Box>
        {img && (
          <Box className={classes.imgContainer}>
            <img src={img} alt="metamask" className={classes.img}/>
          </Box>
        )}
        {header && (
          <Typography className={classes.text}>
            {header}
          </Typography>
        )}
        { subHeader && (
          <Typography className={classes.subText} style={{fontSize: img ? 18 : '1.5rem'}}>
            {subHeader}
          </Typography>
        )}
      </Box>
    </Button>
  )
}