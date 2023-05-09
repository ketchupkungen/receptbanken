import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
/*import {
  createStyles,
  fade,
  Theme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
*/
import { ThemeProvider } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { red } from '@material-ui/core/colors';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import './styles.css';
import Input from './Input';
//import styles from '../styles';
/*
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});
*/
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  /*const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
*/
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className={classes.root}>
      <div className='centerScreenMobile'>
        <Avatar style={{background:'#A52A2A'}} className='registerIcon'>
          <LockOutlinedIcon style={{color:'rgb(255, 222, 89)'}} />
        </Avatar>
        <Typography style={{color:'rgb(255, 222, 89)'}} className='registerText' component="h1" variant="h5">{ isSignup ? 'Registrera' : 'Logga in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="Förnamn" handleChange={handleChange} autoFocus half className='textArea' />
              <Input name="lastName" label="Efternamn" handleChange={handleChange} half className='textArea' />
            </>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email"  className='authInput' />
            <Input name="password" label="Lösenord" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} className='authInput' />
            { isSignup && <Input name="confirmPassword" label="Upprepa lösenord" handleChange={handleChange} type="password" className='authInput' /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" className={classes.submit} style={{background:'#A52A2A', color:'white'}}>
            { isSignup ? 'Registrera' : 'Logga in' }
          </Button>
          {/*<GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            />*/}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode} style={{color:'white'}}>
                { isSignup ? 'Har du redan ett konto? Logga in' : "Har du inget konto? Registrera" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    
      <div className='centerScreen'>
        <Paper className={classes.paper} elevation={6}>
          <Avatar style={{background:'#A52A2A'}}>
            <LockOutlinedIcon style={{color:'rgb(255, 222, 89)'}} />
          </Avatar>
          <Typography style={{color:'rgb(255, 222, 89)'}} className='registerText' component="h1" variant="h5">{ isSignup ? 'Registrera' : 'Logga in' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignup && (
              <>
                <Input name="firstName" label="Förnamn" required handleChange={handleChange} autoFocus half className='textArea notchedOutline'  />
                <Input name="lastName" label="Efternamn" required handleChange={handleChange} half className='textArea notchedOutline'  />
              </>
              )}
              <Input name="email" label="Email" handleChange={handleChange} type="email" className='textArea' />
              <Input name="password" label="Lösenord" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} className='textArea'  />
              { isSignup && <Input name="confirmPassword" label="Upprepa lösenord" handleChange={handleChange} type="password" className='textArea'  /> }
            </Grid>
            <Button type="submit" fullWidth variant="contained" className={classes.submit} style={{background:'#A52A2A', color:'white'}}>
              { isSignup ? 'Registrera' : 'Logga in' }
            </Button>
            {/*<GoogleLogin
              clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
              />*/}
            <Grid container justify="flex-end">
              <Grid item>
                <Button style={{color:'white'}} onClick={switchMode}>
                  { isSignup ? 'Har du redan ett konto? Logga in' : "Har du inget konto? Registrera" }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default SignUp;