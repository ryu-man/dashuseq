import React, { useCallback, useEffect, useRef, useState } from "react";
import jquery from "jquery";

const Modal = ({
	agency = {},
	show,
	api,
	onHidden,
	onAgencyCreated,
	onAgencyUpdated,
}) => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [wilaya, setWilaya] = useState("");
	const [commune, setCommune] = useState("");
	const [phone, setPhone] = useState("");

	const modalRef = useRef();
	const submitHandler = async (e) => {
		e.preventDefault();
		if (agency?._id) {
			try {
				const data = await api.update(agency._id, {
					name,
					address,
					wilaya,
					commune,
					phone,
				});
				onAgencyUpdated?.(data);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const data = await api.create({
					name,
					address,
					wilaya,
					commune,
					phone,
				});
				onAgencyCreated?.(data);
			} catch (err) {}
		}
	};

	useEffect(() => {
		commune && wilaya && setAddress(`${commune}, ${wilaya}`);
	}, [wilaya, commune]);

	useEffect(() => {
		if (show) {
			setName(agency?.name ?? "");
			setAddress(agency?.address ?? "");
			setWilaya(agency?.wilaya ?? "");
			setCommune(agency?.commune ?? "");
			setPhone(agency?.phone ?? "");
			jquery(modalRef.current).modal("show");
		} else {
			jquery(modalRef.current).modal("hide");
		}
	}, [show, agency]);
	
	useEffect(() => {
		jquery(modalRef.current).on("hidden.bs.modal", function (e) {
			onHidden();
		});
	}, []);

	return (
		<form className="form" onSubmit={submitHandler}>
			<div
				ref={modalRef}
				className="modal"
				tabIndex="-1"
				role="dialog"
				id="#exampleModal"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Agency</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>Name</label>
								<input
									type="text"
									className={`form-control${
										name.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={name}
									required
									onChange={(e) => setName(e.currentTarget.value)}
								/>
							</div>

							<div className="form-group">
								<label>Wilaya</label>
								<input
									type="text"
									className={`form-control${
										wilaya.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={wilaya}
									onChange={(e) => {
										const value = e.currentTarget.value;
										setWilaya(value);
									}}
								/>
							</div>
							<div className="form-group">
								<label>Commune</label>
								<input
									type="text"
									className={`form-control${
										commune.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={commune}
									onChange={(e) => {
										const value = e.currentTarget.value;
										setCommune(value);
									}}
								/>
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									className={`form-control`}
									/* className={`form-control${
										address.length === 0 ? " is-invalid" : " is-valid"
									}`} */
									value={address}
									onChange={(e) => setAddress(e.currentTarget.value)}
								/>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									type="text"
									className={`form-control${
										phone.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={phone}
									required
									onChange={(e) => setPhone(e.currentTarget.value)}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cancel
							</button>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Modal;
