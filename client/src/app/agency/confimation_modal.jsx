import React, { useCallback, useEffect, useRef } from "react";
import jquery from "jquery";
import { API } from "./agency_api";

const ConfirmationModal = ({
	agency,
	show,
	api,
	onHidden,
	onAgencyDeleted,
}) => {
	const modalRef = useRef();
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await api.remove(agency._id);
			onAgencyDeleted(agency._id);
			jquery(modalRef.current).modal("hide");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (show) {
			jquery(modalRef.current).modal("show");
		} else {
			jquery(modalRef.current).modal("hide");
		}
	}, [show]);

	useEffect(() => {
		jquery(modalRef.current).on("hidden.bs.modal", function (e) {
			onHidden();
		});
	}, []);
	return (
		<form className="form" onSubmit={submitHandler}>
			<div ref={modalRef} className="modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Delete Agency</h5>
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
							Are you sure you want to delete <strong>"{agency.name}"</strong>{" "}
							agency ?
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cancel
							</button>
							<button type="submit" className="btn btn-danger">
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ConfirmationModal;
