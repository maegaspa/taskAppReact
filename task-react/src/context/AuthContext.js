import React, { createContext, useContext, useReducer } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, isAuthenticated: true, token: action.payload.token };
		case 'LOGOUT':
			return { ...state, isAuthenticated: false, token: null };
		case 'CHECK_TOKEN':
			// Vérifie si le token est expiré
			if (action.payload.token && new Date(action.payload.token.exp * 1000) > new Date()) {
				return { ...state, isAuthenticated: true, token: action.payload.token };
			} else {
				// Token expiré, déconnectez l'utilisateur
				return { ...state, isAuthenticated: false, token: null };
			}
		default:
			return state;
	}
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
		token: null,
	});

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};

const useAuthState = () => {
	const context = useContext(AuthStateContext);
	if (!context) {
		throw new Error('useAuthState must be used within an AuthProvider');
	}
	return context;
};

const useAuthDispatch = () => {
	const context = useContext(AuthDispatchContext);
	if (!context) {
		throw new Error('useAuthDispatch must be used within an AuthProvider');
	}
	return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
