import React, { useContext } from "react";
import { authContext } from "../auth_context";
import "./navbar.scss";

const Navbar = () => {
	const [auth] = useContext(authContext);

	return (
		<nav className="navbar">
			<div className="text app-name">Dashu</div>
			<div className="options">
				<div className="user">
					<div className="avatar">
						{auth?.avatar ? (
							<img className="" src="" alt="" />
						) : (
							<i className="bi bi-person-circle"></i>
						)}
					</div>
					<span className="text user-name">{auth.email}</span>
				</div>
				<button className="text btn more">
					<i className="bi bi-chevron-down"></i>
				</button>
			</div>
		</nav>
	);
};
export default Navbar;
