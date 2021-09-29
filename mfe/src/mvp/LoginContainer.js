import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
    FormGridInnerContainer,
    SlotContainer,
    SocialContainer,
    LoginTyTheme,
    GridStyles,
    GridRowStyles,
    GridHeader
} from './styles/common';
import { StyledButton } from './styles/loginStyles'
import { Auth } from 'aws-amplify'
import { AUTH_ACTIONS, useAuth } from '../contexts/amplifyContext'


const debugCreds = { email: 'nigel447@gmail.com', password: 'DqVwJVWNe6Q6ekW#' }

export const LoginContainer = (props) => {
    const navigate = useNavigate()
    const { state, dispatch } = useAuth()
    const [signUp, IsSignUp] = useState(false)

    const runLogin = async (creds) => {
        console.log(`LoginContainer runLogin ${creds.email}  ${creds.psswd}`)
        await Auth.signIn(debugCreds.email, debugCreds.password)
        const current = await Auth.currentSession()
        current.isValid()
        console.log(`LoginContainer session isValid ${current.isValid()}`)
        if (current.isValid()) {
            dispatch({
                type: AUTH_ACTIONS.LOGIN,
                value: { auth: true, email: current.idToken.payload.email }
            })
            navigate('/welcome')
        }
    }

    const runSignUp = async (creds) => {
        console.log(`LoginContainer runSignUp ${creds.uname} ${creds.email}  ${creds.psswd}`)
        try {
            const { user } = await Auth.signUp({
                username:creds.email, 
                password:creds.psswd,
            });
            console.log(`sign up ok usr: ${ user}`);
            IsSignUp(false)
            navigate('/login')
        } catch (error) {
            console.log('error signing up:', error);
        }
   
    }

 
    const showSignUp =() => {
        IsSignUp(true)
    }

    const showLogIn =() => {
        IsSignUp(false)
    }

    const runSocial = async () => {
        // need to set correct calback in gcp console API and services => credentials
        Auth.federatedSignIn()
    }

    return (
        <>
            {!signUp && <LoginView social={runSocial} loginAction={runLogin} showSignUpAction = {showSignUp} />}
            {signUp && <SignUpView signUpAction={runSignUp} showLogInAction = {showLogIn}/>}
        </>
    )
}

const LoginView = (props) => {
    const emailRef = useRef();
    const psswdRef = useRef();

    const renderSocial = () => {
        return (
            <StyledButton style={GridRowStyles}
                variant="contained"
                onClick={() => props.social()}
            >
                <ThemeProvider theme={LoginTyTheme}>
                    <Typography variant="h7" > Google Login   </Typography>
                </ThemeProvider>
            </StyledButton>
        )
    }

    const renderFormHeader = () => {
        return (
            <Grid item xs={6} style={GridHeader} >
                <ThemeProvider theme={LoginTyTheme}>
                    <Typography variant="h5" noWrap> Log In To SO Pipe </Typography>
                </ThemeProvider>
            </Grid>
        )
    }

    return (
        <SlotContainer >
            <SocialContainer>{renderSocial()}</SocialContainer>
            <FormGridInnerContainer  >    {/*style={DebugStyles}   style={DebugStyles1}   */}
                <Grid container style={GridStyles} spacing={2} >
                    <Grid container style={GridRowStyles}  >
                        {renderFormHeader()}
                    </Grid>
                    <Grid container style={GridRowStyles}  >
                        <Grid item xs={6}>
                            <TextField fullWidth
                                label="Email"
                                name="email"
                                size="medium"
                                variant="outlined"
                                inputRef={emailRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={GridRowStyles}  >
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                size="medium"
                                type="password"
                                variant="outlined"
                                inputRef={psswdRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={GridRowStyles} >
                        <Grid item xs={2}>
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => props.loginAction({ email: emailRef.current.value, psswd: psswdRef.current.value })}
                            >
                                <ThemeProvider theme={LoginTyTheme}>
                                    <Typography variant="h7" >Login</Typography>
                                </ThemeProvider>

                            </StyledButton>
                        </Grid>
                        <Grid item xs={1}> </Grid>
                        <Grid item xs={2}>
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => props.showSignUpAction( )}
                            >
                                <ThemeProvider theme={LoginTyTheme}>
                                    <Typography variant="h7" >Sign Up</Typography>
                                </ThemeProvider>
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            </FormGridInnerContainer>
        </SlotContainer >
    )
}


const SignUpView = (props) => {
    const emailRef = useRef();
    const psswdRef = useRef();
    const renderSUFormHeader = () => {
        return (
            <Grid item xs={6} style={GridHeader} >
                <ThemeProvider theme={LoginTyTheme}>
                    <Typography variant="h5" noWrap> Sign Up To SO Pipe </Typography>
                </ThemeProvider>
            </Grid>
        )
    }
    return (
        <SlotContainer >
            <FormGridInnerContainer  >
                <Grid container style={GridStyles} spacing={2} >
                    <Grid container style={GridRowStyles}  >
                        {renderSUFormHeader()}
                    </Grid>
                    <Grid container style={GridRowStyles}  >
                        <Grid item xs={6}>
                            <TextField fullWidth
                                label="Email"
                                name="email"
                                size="medium"
                                variant="outlined"
                                inputRef={emailRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={GridRowStyles}  >
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                size="medium"
                                type="password"
                                variant="outlined"
                                inputRef={psswdRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={GridRowStyles} >

                        <Grid item xs={2}>
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => props.signUpAction({ email: emailRef.current.value, psswd: psswdRef.current.value })}
                            >
                                <ThemeProvider theme={LoginTyTheme}>
                                    <Typography variant="h7" >Sign Up</Typography>
                                </ThemeProvider>
                            </StyledButton>
                        </Grid>
                        <Grid item xs={1}> </Grid>
                        <Grid item xs={2}>
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => props.showLogInAction( )}
                            >
                                <ThemeProvider theme={LoginTyTheme}>
                                    <Typography variant="h7" >Log In</Typography>
                                </ThemeProvider>
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            </FormGridInnerContainer>
        </SlotContainer >
    )
}