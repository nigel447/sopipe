import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify'
import { AUTH_ACTIONS, useAuth } from '../contexts/amplifyContext'

export const SocialLoginCallbacContainer = (props) => {
    const { state, dispatch } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        // first check is a social login
        Auth.currentAuthenticatedUser().then((creds) => {
            //console.log(`SocialLoginCallbacContainer federatedSignIn creds ${JSON.stringify(creds)}`)
            if (creds) {
                console.log(`SocialLoginCallbacContainer federatedSignIn session request dispatch email ${creds.signInUserSession.idToken.payload.email}`)
                dispatch({
                    type: AUTH_ACTIONS.LOGIN,
                    value: { auth: true, email: creds.signInUserSession.idToken.payload.email }
                })
                navigate('/welcome')
            }
        }).catch((err) => {

            console.log(`SocialLoginCallbacContainer federatedSignIn session request err ${JSON.stringify(err)}`)
            let current = Auth.currentSession().then((ret) => {
                console.log(`SocialLoginCallbacContainer federatedSignIn currentSession ${current}`)
                navigate('/welcome')
            }).catch((err) => {
                console.log(`SocialLoginCallbacContainer currentSession request err  ${err}`)
                navigate('/login')
            })

        })
    }, [])


    return (<><h4>checking</h4></>)
}