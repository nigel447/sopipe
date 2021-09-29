import React, { createContext, useReducer } from 'react';

export const LayoutContext = createContext();

export const INITIAL_INPUT_STATE = {
    browser: {
        width: 0,
        height: 0,
    },

    screens: {
        isLoginScreen: false,
    },

    dialogs: {
        helpOpen: false,
        infoOpen: false,
        emailOpen: false,
    }

}

const initialState = {
    input: INITIAL_INPUT_STATE,
}

export const ACTIONS = {

    LOGIN_SCREEN: `loginScreen`,
    OPEN_HELP: `openHelp`,
    OPEN_INFO: `openInfo`,
    OPEN_EMAIL: `openEmail`,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_SCREEN: {
            if (action.value === state.input.screens.isLoginScreen) {
                return state;
            }
            return {
                ...state,
                input: {
                    ...state.input,
                screens: {
                    ...state.input.screens,
                    isLoginScreen: action.value,
                }
            }
            }
        }
        case ACTIONS.OPEN_HELP: {
            if (action.value === state.input.dialogs.helpOpen) {
                return state;
            }
            return {
                ...state,
                input: {
                    ...state.input,
                dialogs: {
                    helpOpen: action.value,
                }
            }
            }
        }
        case ACTIONS.OPEN_INFO: {
            if (action.value === state.input.dialogs.infoOpen) {
                return state;
            }
            return {
                ...state,
                input: {
                    ...state.input,
                dialogs: {
                    infoOpen: action.value,
                }
            }
            }
        }
        case ACTIONS.OPEN_EMAIL: {
            if (action.value === state.input.dialogs.emailOpen ) {
                return state;
            }
            return {
                ...state,
                input: {
                    ...state.input,
                dialogs: {
                    emailOpen: action.value,
                }
            }
            }
        }
        default: {
            throw new Error(`Unexpected action: ${JSON.stringify(action)}`);
        }
    }
}

export const LayoutContextProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LayoutContext.Provider value={[state, dispatch]}>
            {props.children}
        </LayoutContext.Provider>
    );
}