import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider, AuthConsumer } from "./auth_context";
import Login from "./auth/login";
import App from "./app/App";
import './global.scss';
import "bootstrap";

// import reportWebVitals from './reportWebVitals';

function switcher(value) {
  switch (value) {
    case true:
      return <App></App>;

    default:
      return <Login></Login>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthConsumer>
        {([value,]) => switcher(value.token !== undefined)}
      </AuthConsumer>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("dashu-app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
