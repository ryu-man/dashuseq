import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { authContext } from "../../auth_context";
import SelectDropdown from "../../components/select_dropdown";
import Modal from "./agency_model";
import DeleteConfirmationModal from "./confimation_modal";

import "./agency_page.scss";
import { API } from "./agency_api";

export const api = new API();

/***********************************************************************************************************************/

const Agency = ({
	name,
	address,
	wilaya,
	phone,
	createdAt,
	selected = false,
	onUpdate,
	onDelete,
}) => {
	const [_selected, setSelected] = useState(selected);
	useEffect(() => {
		setSelected(selected);
	}, [selected]);

	return (
		<tr>
			<td>
				<label className="checkbox">
					<input
						type="checkbox"
						checked={_selected}
						onChange={(e) => {
							setSelected(e.currentTarget.checked);
						}}
					/>
					<span></span>
				</label>
			</td>
			<td>{name}</td>
			<td>{address}</td>
			<td>{wilaya}</td>
			<td>{phone}</td>
			<td>{format(new Date(createdAt), "dd MMM yyyy")}</td>
			<td className="actions">
				<button type="button" className="btn" onClick={() => onUpdate()}>
					<i className="bi bi-pencil"></i>
				</button>
				<button type="button" className="btn" onClick={() => onDelete()}>
					<i className="bi bi-trash"></i>
				</button>
			</td>
		</tr>
	);
};

/***********************************************************************************************************************/

const AgencyPage = () => {
	const [agencies, setAgencies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showConfModal, setShowConfModal] = useState(false);
	const [selectedAgency, setSelectedAgency] = useState({});
	const [auth] = useContext(authContext);
	const onAddAgencyhandler = () => {
		setSelectedAgency({});
		setShowModal(true);
	};

	useEffect(() => {
		api.setToken(auth.token);
		api
			.readAll()
			.then((data) => {
				setAgencies(data);
			})
			.catch((err) => {
				setAgencies([]);
			});
	}, [auth]);

	return (
		<>
			<Modal
				agency={selectedAgency}
				show={showModal}
				api={api}
				onHidden={() => {
					setShowModal(false);
				}}
				onAgencyCreated={(agency) => {
					setAgencies([...agencies, agency]);
				}}
				onAgencyUpdated={(updatedAgency) => {
					const array = [];
					for (const agency of agencies) {
						if (agency.id === updatedAgency.id) {
							array.push(updatedAgency);
							continue;
						}
						array.push(agency);
					}
					setAgencies(array);
				}}
			/>
			<DeleteConfirmationModal
				agency={selectedAgency}
				show={showConfModal}
				api={api}
				onHidden={() => setShowConfModal(false)}
				onAgencyDeleted={(id) =>
					setAgencies(agencies.filter(({ id:_id }) => _id !== id))
				}
			/>
			<div className="page agency-page">
				<div className="header">
					<div className="title">
						Agencies
						<div className="sub">{agencies.length} Agencies</div>
					</div>
					<SelectDropdown placeholder="Filter by company, commune,..." />
					{/* <div className="filter-input">
						<i className="bi bi-funnel"></i>
						<select className="form-control" defaultValue="0">
							<option className="placeholder" value="0" disabled>
								Filter by company, commune,...
							</option>
						</select>
					</div> */}
					<div className="search-input">
						<input
							className="form-control"
							type="text"
							placeholder="Search..."
						/>
						<i className="bi bi-search"></i>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						data-toggle="modal"
						data-target="#exampleModal"
						onClick={onAddAgencyhandler}
					>
						<i className="bi bi-plus-circle" />
						Add agency
					</button>
				</div>
				<br />
				<table className="table">
					<thead>
						<tr>
							<th>
								<label className="checkbox">
									<input
										className=""
										type="checkbox"
										onChange={(e) => {
											setAgencies(
												agencies.map((ag) => {
													ag.selected = e.currentTarget.checked;
													return ag;
												})
											);
										}}
									/>
									<span></span>
								</label>
							</th>
							<th>Name</th>
							<th>Address</th>
							<th>Wilaya</th>
							<th>Phone</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{agencies.map((agency, i) => (
							<Agency
								key={agency.id}
								name={agency.name}
								address={agency.address}
								wilaya={agency.wilaya}
								phone={agency.phone}
								createdAt={agency.createdAt}
								selected={agency.selected}
								onUpdate={() => {
									setSelectedAgency(agency);
									setShowModal(true);
								}}
								onDelete={() => {
									setSelectedAgency(agency);
									setShowConfModal(true);
								}}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AgencyPage;
