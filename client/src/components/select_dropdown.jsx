import React from "react";
import './select_dropdown.css'

const SelectDropdown = ({ placeholder = "" }) => {
	return (
		<div className="select-dropdown">
            <i className="bi bi-funnel"></i>
			<input className="form-control" placeholder={placeholder} />
			<i className="bi bi-chevron-down" />
		</div>
	);
};

export default SelectDropdown
