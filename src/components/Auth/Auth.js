import React, {useState, useEffect} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//import Icon from './Icon';
import useStyles from './styles';
import Input from './Input';
import DividerWithText from './DividerWithText'
import {signup, login, fbauth} from '../../actions/auth'

import fbImage from '../../images/facebook.jpg';
import googleImage from '../../images/google_circular_logo.jpg';

const initialState = { firstName: "", lastName: "", email: "", password:"", confirmPassword: ""};

const Auth = () => {
    //const message = useSelector(state => state.auth.authMessage); //getting auth message if any from the redux store 
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const classes= useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) 

    useEffect(() => { 
        if(!isLoggedIn)
        {   
            console.log("user logged in :" + isLoggedIn);
            toast.error("Please Log in to continue !!");
        }
        
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(formData);
        if(isSignup){
            dispatch(signup(formData, history));

            setFormData({
                ...formData,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
        }
        else{
            dispatch(login(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const resultData = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({ type: 'AUTH', data: {resultData, token} });

            history.push('/');
        }catch(error){
            console.log(error.response);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again');
    }

    const responseFacebook = (response) => {
        dispatch(fbauth(response, history));
      }
    
    return (
        <Container component="main" maxwidth="xs">
            <ToastContainer />
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Log In"}</Typography>

                <DividerWithText>Or</DividerWithText>

                <div className={classes.row}>
                    <GoogleLogin
                        clientId="229497089982-83a13k8mllfaa34tvmfodsh1g2on7udq.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button className={classes.fbButton} onClick={ renderProps.onClick } disabled={ renderProps.disabled } variant="contained">
                                <Avatar alt="google-logo" src={googleImage}></Avatar>
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <FacebookLogin
                        appId="1956024437885558"
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <Button className={classes.fbButton} onClick={ renderProps.onClick } disabled={ renderProps.disabled } variant="contained">
                                <Avatar alt="facebook-logo" src={fbImage}></Avatar>
                            </Button>
                        )}
                    />

                </div>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} value={formData.firstName} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} value={formData.lastName} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} value={formData.email} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} value={formData.password} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} value={formData.confirmPassword} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth
