import React from 'react';
import { Box, Container, Grid, makeStyles, TextField, Button,Typography } from '@material-ui/core';
import { useFormik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from '@material-ui/core';
import telegram from '../../assets/telegram.png'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    background: theme.palette.common.white,
    padding: '2rem',
    paddingBottom: 0,
    borderRadius: 8,
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem"
  },
  telegramText: {
    fontSize: theme.typography.pxToRem(22),
    color: theme.palette.primary.main
  },
  fields: {},
  socialIcons: {}
}))

const initialValues = {
  firstName: "",
  lastName: "",
  telelgramId: "",
  location: "",
  teamMembers: "",
  linkToGithub: "",
  linkToWebSites: "",
  socialMediaLinks: "",
  messageToComunity: "",
  adminNotes: ""
}

export default function ClpForm() {
  const classes = useStyles()
  const LoginSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(),
    lastName: Yup.string()
    .required()
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <Box className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
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
                <TextField id="telelgramId" fullWidth value={formik.values.telelgramId} onChange={formik.handleChange} helperText={formik.errors.telelgramId} error={!!formik.errors.telelgramId && formik.touched.telelgramId} name="telelgramId" label="Telegram ID" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField id="location" fullWidth value={formik.values.location} onChange={formik.handleChange} helperText={formik.errors.location} error={!!formik.errors.location && formik.touched.location} name="location" label="location" variant="outlined" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField id="teamMembers" fullWidth value={formik.values.teamMembers} onChange={formik.handleChange} helperText={formik.errors.teamMembers} error={!!formik.errors.teamMembers && formik.touched.teamMembers} name="teamMembers" label="Members" variant="outlined" />
                  </Grid>
                </Grid>  
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="email" fullWidth value={formik.values.linkToGithub} onChange={formik.handleChange} helperText={formik.errors.linkToGithub} error={!!formik.errors.linkToGithub && formik.touched.linkToGithub} name="linkToGithub" label="Link To Github" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField id="linkToWebSites" fullWidth value={formik.values.linkToWebSites} onChange={formik.handleChange} helperText={formik.errors.linkToWebSites} error={!!formik.errors.linkToWebSites && formik.touched.linkToWebSites} name="linkToWebSites" label="Link To WebSites" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="socialMediaLinks" fullWidth value={formik.values.socialMediaLinks} onChange={formik.handleChange} helperText={formik.errors.socialMediaLinks} error={!!formik.errors.socialMediaLinks && formik.touched.socialMediaLinks} name="socialMediaLinks" label="Social Media Links" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField id="messageToComunity" fullWidth value={formik.values.messageToComunity} onChange={formik.handleChange} helperText={formik.errors.messageToComunity} error={!!formik.errors.messageToComunity && formik.touched.messageToComunity} name="messageToComunity" label="Message To Comunity" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4} wrap="wrap">
              <Grid item xs={12} md={6}>
                <TextField id="adminNotes" multiline rows={4} fullWidth value={formik.values.adminNotes} onChange={formik.handleChange} helperText={formik.errors.adminNotes} error={!!formik.errors.adminNotes && formik.touched.adminNotes} name="adminNotes" label="Admin Notes" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
              <Link href="https://t.me/cobaltlend" target="_blank" rel="noopener">
                <Typography className={classes.telegramText}>
                  Join our telegram
                </Typography>
                {/* <img src={telegram} className={classes.socialIcons}/> */}
              </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.buttonContainer}>
          <Button type="submit" disabled={formik.isSubmitting} variant="outlined" color="primary">
            Submit
          </Button>
        </Box>        
      </form>
    </Box>
  )
}

