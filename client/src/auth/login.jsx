import React, { useState } from "react";
import { useContext } from "react";
import { authContext } from "../auth_context";
import AuthAPI from "./auth_api";

import "./login.scss";

const authAPI = new AuthAPI();

const Login = () => {
	const [, setAuth] = useContext(authContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [passwordInputType, setPasswordInputType] = useState("password");

	return (
		<div className="login">
			<div className="side">
				<div className="app-name">Dashu</div>
				<form
					className="form"
					action=""
					onSubmit={async (e) => {
						e.preventDefault();
						try {
							const authData = await authAPI.login(email, password);
							setAuth(authData);
						} catch (err) {
							setError(err.message);
						}
					}}
				>
					<div className="form-group">
						<label>Email</label>
						<input
							className={`form-control${
								error.length !== 0 ? " is-invalid" : ""
							}`}
							type="email"
							value={email}
							onBlur={(e) => {
								const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								if (!regex.test(e.currentTarget.value)) {
									setError("You email does not respect email format !");
								} else {
									setError("");
								}
							}}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
					</div>

					<div className="password form-group">
						<label>Password</label>
						<div className="icon-wrapper">

						<input
							className={`form-control${
								error.length !== 0 ? " is-invalid" : ""
							}`}
							type={passwordInputType}
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						{passwordInputType === "password" && (
							<i
								class="bi bi-eye"
								onClick={() => setPasswordInputType("text")}
							></i>
						)}
						{passwordInputType === "text" && (
							<i
								class="bi bi-eye-slash"
								onClick={() => setPasswordInputType("password")}
							></i>
						)}
						</div>
					</div>

					<div
						className="form-group"
						style={{ marginTop: "2rem", marginBottom: "2rem" }}
					>
						<button type="submit" className="col btn btn-primary">
							Login
						</button>
					</div>
					<div className="form-group options">
						<div className="form-row">
							<div className="col">
								<label htmlFor="rememberme">
									<input
										type="checkbox"
										name=""
										id="rememberme"
										onChange={(e) => console.log(e.currentTarget.checked)}
									/>
									<span>Remember me</span>
								</label>
							</div>
							<div className="col text-right">
								<a href="/">Forget your password?</a>
							</div>
						</div>
					</div>

					{error.length !== 0 && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
				</form>
			</div>
			<div className="background-wrapper">
				<img src="background.png" />
			</div>
		</div>
	);
};

export default Login;
