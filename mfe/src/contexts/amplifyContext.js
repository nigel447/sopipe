import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Amplify } from 'aws-amplify'

const AuthContext = createContext();

const INITIAL_AUTH_STATE = {
  auth: false,
  email: '',
}

const AUTH_ACTIONS = {
  LOGIN: `login`,
  LOGOUT: `logout`,

}
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN: {
      const { auth, email } = action.value;
      return {
        ...state,
        auth: auth,
        email: email,
      }
    }
    case AUTH_ACTIONS.LOGOUT: {
      const { auth, email } = action.value;
      return {
        ...state,
        auth: auth,
        email: email,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE)
  const value = { state, dispatch }
 
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a CountProvider')
  }
  return context
}

export { AUTH_ACTIONS, AuthContext, AuthProvider, useAuth }

