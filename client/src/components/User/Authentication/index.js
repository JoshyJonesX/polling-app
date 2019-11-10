import React, { useState, Fragment } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default ({ buttonText, linkText, helperText, authUser, otpAuth, otp, signIn}) => {
  const classes = useStyles()
  const [pin, setPin] = useState('')
   const [userData, setUserData] = useState({
     matNo: '',
     password: '',
     userName: '',
     department: '',
     phoneNum: '',
   })

  const handleChange = e => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const handlePinChange = e => {
    setPin(e.target.value)
  }
   
  const handleSubmit = e => {
    e.preventDefault()
    console.log(userData)
    const authType = signIn? 'signIn' : 'singUp'
    authUser(authType, userData).then(() => {
      console.log("Logged in successfully")
    })
  }

  const handleSubmitOTP = e => {
    e.preventDefault()
    const authType = otp.request_id ? "check" : "register"
    otpAuth(authType, {...pin, request_id: otp.request_id, matNo: userData.matNo}).then(() => {
      console.log('verified')
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {buttonText}
        </Typography>
        {signIn && <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="matNo"
                name="matNo"
                variant="outlined"
                required
                fullWidth
                id="matricNumber"
                value={userData.matNo}
                onChange={handleChange}
                label="Matric Number"
                autoFocus
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {buttonText}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to={`${linkText}`}>
              <Typography variant="body2">
                {helperText}
              </Typography>
            </Link>
            </Grid>
          </Grid>
        </form>}


        {!signIn && <form className={classes.form} noValidate onSubmit={handleSubmitOTP}>
          <Grid container spacing={2}>
            {!otp.request_id && <Grid item xs={12}>
              <TextField
                autoComplete="matNo"
                name="matNo"
                variant="outlined"
                required
                fullWidth
                id="matricNumber"
                value={userData.matNo}
                onChange={handleChange}
                label="Matric Number"
                autoFocus
              />
            </Grid>}
            {otp.request_id && <Grid item xs={12}>
              <TextField
                name="pin"
                variant="outlined"
                required
                fullWidth
                id="pin"
                value={pin}
                onChange={handlePinChange}
                label="PIN"
                autoFocus
              />
            </Grid>}
          </Grid>
          {!otp.request_id && 
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {buttonText}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
              <Link to={`${linkText}`}>
                <Typography variant="body2">
                  {helperText}
                </Typography>
              </Link>
              </Grid>
            </Grid>
          </Fragment>}
          {otp.request_id && 
          <Fragment>
            <Grid item>            
              <Typography variant="body2">
                {`OTP sent to ${userData.phoneNum}`}
              </Typography>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify
          </Button>
          </Fragment>}
        </form>}        
      </div>
    </Container>
  )
}