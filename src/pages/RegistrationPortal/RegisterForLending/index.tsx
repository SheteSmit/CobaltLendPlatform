import { Box, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import FormView from '../FormView'
import TakePhoto from '../TakePhoto'
import UploadButton from '../UploadButton'
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import useWindowSize from '../../../hooks/useWindowSize'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 1rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center'
    }
    // flexWrap: 'wrap'
  },
  buttonContainer: {

  },
  leftContainer: {

  },
  fieldsContainer: {
    
    // paddingLeft: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  fields: {}
}))

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  city: "",
  email: "",
  phoneNumber: "",
  annualIncome: 0,
  netWorth: 0,
  jobTitle: '',
  assets: '',
  debt: '',
  dateOfBirth: null
}

export default function RegisterForLending() {
  const classes = useStyles()
  const { width } = useWindowSize()
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required(),
    lastName: Yup.string()
    .required()
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {

    }
  })

  return (
    <FormView>
      <form className={classes.root}>
        <Box className={classes.leftContainer}>
          <TakePhoto />
          <Box className={classes.buttonContainer}>
            <UploadButton title="Verify Phone Number"/>
            <UploadButton title="Upload ID"/>
            <UploadButton title="Upload Bank Statement"/>
            <UploadButton title="Upload docs"/>
          </Box>
        </Box>
        <Box className={classes.fieldsContainer}>
      
        <Grid container className={classes.fields} spacing={2} wrap="wrap">
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="firstName" fullWidth value={formik.values.firstName} onChange={formik.handleChange} helperText={formik.errors.firstName} error={!!formik.errors.firstName && formik.touched.firstName} name="firstName" label="First name" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="lastName" fullWidth value={formik.values.lastName} onChange={formik.handleChange} helperText={formik.errors.lastName} error={!!formik.errors.lastName && formik.touched.lastName} name="lastName" label="Last name" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="address" fullWidth value={formik.values.address} onChange={formik.handleChange} helperText={formik.errors.address} error={!!formik.errors.address && formik.touched.address} name="address" label="Address" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField id="zipCode" fullWidth value={formik.values.zipCode} onChange={formik.handleChange} helperText={formik.errors.zipCode} error={!!formik.errors.zipCode && formik.touched.zipCode} name="zipCode" label="Zip Code" variant="outlined" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField id="city" fullWidth value={formik.values.city} onChange={formik.handleChange} helperText={formik.errors.city} error={!!formik.errors.city && formik.touched.city} name="city" label="City" variant="outlined" />
                  </Grid>
                </Grid>  
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="email" fullWidth value={formik.values.email} onChange={formik.handleChange} helperText={formik.errors.email} error={!!formik.errors.email && formik.touched.email} name="email" label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField id="phoneNumber" fullWidth value={formik.values.phoneNumber} onChange={formik.handleChange} helperText={formik.errors.phoneNumber} error={!!formik.errors.phoneNumber && formik.touched.phoneNumber} name="phoneNumber" label="Phone Number" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="annualIncome" fullWidth value={formik.values.annualIncome} onChange={formik.handleChange} helperText={formik.errors.annualIncome} error={!!formik.errors.annualIncome && formik.touched.annualIncome} name="annualIncome" label="Annual Income" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField id="netWorth" fullWidth value={formik.values.netWorth} onChange={formik.handleChange} helperText={formik.errors.netWorth} error={!!formik.errors.netWorth && formik.touched.netWorth} name="netWorth" label="Net Worth" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="jobTitle" fullWidth value={formik.values.jobTitle} onChange={formik.handleChange} helperText={formik.errors.jobTitle} error={!!formik.errors.jobTitle && formik.touched.jobTitle} name="jobTitle" label="Job Title" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField id="assets" fullWidth value={formik.values.assets} onChange={formik.handleChange} helperText={formik.errors.assets} error={!!formik.errors.assets && formik.touched.assets} name="assets" label="Assets" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="annualIncome" fullWidth value={formik.values.debt} onChange={formik.handleChange} helperText={formik.errors.debt} error={!!formik.errors.debt && formik.touched.annualIncome} name="debt" label="Debt" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <KeyboardDatePicker id="dateOfBirth" format="M/DD/YYYY" value={formik.values.dateOfBirth} onChange={value => formik.setFieldValue("dateOfBirth", value)} helperText="Select Date of Birth"  name="dateOfBirth" label="Date Of Birth" fullWidth/>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
        </Box>
      </form>
    </FormView>
  )
}