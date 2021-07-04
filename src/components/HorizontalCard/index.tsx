import { Box, Card, makeStyles, Typography,TextField, withStyles } from '@material-ui/core';
import React from 'react';
import CommonButton from '../Buttons/CommonButton'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {useFormik} from 'formik'
import * as Yup from 'yup';
import QuestionToolTip from '../QuestionToolTip';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    width: '100%',
    position: 'relative',
  },
  root: {
    display: 'flex',
    
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    margin: '1rem 0',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    '@media (max-width:600px)': {
      flexDirection: 'column',
    }
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '@media (max-width:600px)': {
      flexWrap: 'wrap',
    }
  },
  circle: {
    width: 80,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    '&:hover': {
      background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    },
  },
  thumbnail: {
    width: 50
  },
  circleText: {
    fontWeight: 700,
    color: theme.palette.common.white
  },
  buttonContainer: {},
  numberButtonContainer: {
    position: 'absolute',
    right: 16,
    '@media (max-width:725px)': {
      position: 'relative',
      right: 0,
    }
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',
    width: '100%',
    maxWidth: 300
  },
  position: {},
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  centerTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  centerText: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    opacity: 0.8
  },
  numberSelectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '@media (max-width:600px)': {
      flexDirection: 'column',
    }
  },
  statusContainer: {
    width: 30,
    height: 30
  },
  lotteryText: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    opacity: 0.8,
    '@media (max-width:600px)': {
      fontSize: theme.typography.pxToRem(14),
    }
  },
  textSelectContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width:600px)': {
     padding: '4px 8px 8px 8px'
    }
  },
  text: {},
  toolTipContainer: {
    position: 'absolute',
    top: 15,
    left: 2
  }
}))

const StyledTextField = withStyles((theme) => ({
  root: {
    borderColor: theme.palette.secondary.main,
    padding: '0 8px',
    backgroundColor: theme.palette.common.white,
    '& .MuiOutlinedInput-root': {  
      '& fieldset': {
        border: `2px solid ${theme.palette.secondary.main}`,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: 11,
      padding: '13px 14px',
    }
  }
}))(TextField)

type ToolTipPlacement =  "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | "top" | undefined

interface props {
  position?: string
  location?: string
  compensation?: string
  employmentType?: string
  service?: boolean
  thumbnail?: any
  buttonText?: string
  lotteryText?: string
  buttonHeight?: number | string
  pickNumber?: boolean
  toolTipText?: string
  toolTipPlacement?: ToolTipPlacement
  tooltip?: boolean
}

export default function CatalystCard({
    toolTipText,
    toolTipPlacement = "top",
    position, 
    location, 
    compensation, 
    employmentType, 
    service, 
    thumbnail, 
    buttonText = "Buy now", 
    lotteryText, 
    buttonHeight, 
    pickNumber,
    tooltip
}: props) {
  const [number, setNumber] = React.useState<number>()
  const [error, setError] = React.useState(false)
  const [available, setAvailable] = React.useState<boolean | undefined>(undefined)
  const classes = useStyles()
  
  

  const initialValues = {
    numberSelected: undefined,
  }

  React.useEffect(() => {
    if(!number) setAvailable(undefined)
    console.log(number)
  },[number])

  const handlePickNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value))
    setAvailable(true)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      numberSelected: Yup.number()
    }),
    onSubmit: ({numberSelected}) => {
      console.log(numberSelected)
    }
  })

  React.useEffect(() => {console.log(formik.errors)},[formik])

  return (
      <Box className={classes.rootContainer}>
        { tooltip && (
        <Box className={classes.toolTipContainer}>
          <QuestionToolTip text={toolTipText} placement={toolTipPlacement} size={17}/>
        </Box>
        )}
      <Card className={classes.root} elevation={2}>
      
        <Box className={classes.contentContainer}>
          {thumbnail && (
            <Box >
              <img src={thumbnail} alt="thumbnail" className={classes.thumbnail}/> 
            </Box>
          )}
          {(position || service) && (
          <Box className={classes.textContainer}>
            <Typography className={classes.position}>
              {position}
            </Typography>
            <Box className={classes.detailsContainer}>
              <Typography className={classes.text}>
                {location}
              </Typography>
              <Typography className={classes.text}>
                {compensation}
              </Typography>
              <Typography className={classes.text}>
                {employmentType}
              </Typography>
            </Box>
          </Box>
          )}
          {lotteryText && (
            <Box className={classes.centerTextContainer} style={{justifyContent: pickNumber ? 'space-between' : 'center', paddingLeft: pickNumber ? '1rem': 0}}>
              { !pickNumber && (
              <Typography className={classes.lotteryText}>
                {lotteryText}
              </Typography>
              )}
              {pickNumber && (
                <form onSubmit={formik.handleSubmit}>
                  <Box className={classes.numberSelectContainer}>
                    <Box className={classes.textSelectContainer}>
                      <Typography className={classes.lotteryText}>
                        {lotteryText}
                      </Typography>
                      <StyledTextField  
                        variant="outlined"
                        name="numberSelected"
                        placeholder="Enter a number"
                        onChange={formik.handleChange}
                        error={!!formik.errors.numberSelected}
                        style={{width: 120, fontSize: 12}}
                      />
                    
                        {formik.values.numberSelected !== undefined && ( !formik.errors.numberSelected ? (
                          <Box className={classes.statusContainer}>
                          <CheckIcon style={{fontSize: 25, color: 'green'}}/>
                          </Box>
                        ): (
                          <Box className={classes.statusContainer}>
                          <ClearIcon style={{fontSize: 25, color: 'red'}}/>
                          </Box>
                        ))}
                    
                    </Box>
                    <Box className={classes.numberButtonContainer}>
                      <CommonButton label={service? "Hire now" : buttonText} width={100} height={buttonHeight} type="submit"/>
                    </Box>
                  </Box>
                </form>
              )}
            </Box>
          )}
        </Box>
        {!pickNumber && (
        <Box className={classes.buttonContainer}>
          <CommonButton label={service? "Hire now" : buttonText} width={100} height={buttonHeight}/>
        </Box>
        )}
    
      </Card>
      </Box>
  )
}