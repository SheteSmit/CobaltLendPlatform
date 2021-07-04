import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import FormView from '../FormView'
import UploadButton from '../UploadButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TakePhoto from '../TakePhoto'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {}
}))

const initialValues = {
  test: ""
}

export default function RegisterToVote() {
  const classes = useStyles()
  const schema = {}

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {

    }
  })

  return (
    <FormView>
      <form className={classes.form}>
        <TakePhoto />
        <Box className={classes.buttonContainer}>
          <UploadButton title="Verify Phone Number"/>
          <UploadButton title="Upload ID"/>
        </Box>
      </form>
    </FormView>
  )
}