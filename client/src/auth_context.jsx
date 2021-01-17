import React, { createContext } from "react";
import { useState } from "react";

export const authContext = createContext({});

export const AuthProvider = ({ children }) => {
	const authState = useState({});

	return (
		<authContext.Provider value={authState}>{children}</authContext.Provider>
	);
};

export const AuthConsumer = ({ children }) => {
	return (
		<authContext.Consumer>
			{(value) => (children instanceof Function ? children(value) : children)}
		</authContext.Consumer>
	);
};
