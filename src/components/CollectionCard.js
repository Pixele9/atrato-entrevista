import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import Remove from "../assets/Remove.svg";

import { removeTask } from "../api";

export default function CollectionCard(props) {
	const { title, description, id, setShouldFetch, setShowUpdateModal, setUpdateID, routeID, routeName } = props;

	const history = useHistory();

	return (
		<div className="w-full h-22 light-bg rounded-xl shadow-2xl flex flex-col mt-4 max-w-5xl cursor-pointer" onClick={() => history.push(`/${routeName}/${routeID}`)}>
			<div className="w-full flex flex-row justify-between py-2 px-4">
				<div className="w-full flex flex-row justify-between py-2 px-4">
					<div className="flex flex-col items-start">
						<p className="text-white text-xl font-bold">{title} </p>
						<p className="text-white font-light">{description} </p>
					</div>
					<div className="flex flex-row justify-evenly items-center w-24">
						<img
							src={Remove}
							alt="Remove button"
							className="cursor-pointer p-4"
							onClick={async () => {
								setShouldFetch(true);
								setUpdateID(id);
								removeTask(id);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
