import React, { useState } from "react";

import ProgressBar from "./ProgressBar";

import Edit from "../assets/Edit.svg";
import Remove from "../assets/Remove.svg";

import { removeTask } from "../api";

export default function Card(props) {
	const { title, description, id, setShouldFetch, setShowUpdateModal, setUpdateID, completed } = props;

	const [checked, setChecked] = useState(false);

	return (
		<div className="w-full h-22 light-bg rounded-xl shadow-2xl flex flex-col mt-4">
			<div className="w-full flex flex-row justify-between py-2 px-4">
				<div className="flex items-center justify-center">
					<input
						type="checkbox"
						onChange={() => {
							setChecked(!checked);
							setShouldFetch(true);
						}}
						className="w-6 h-6 form-tick appearance-none rounded-full cursor-pointer checked:bg-cyan border-2 border-cyan checked:light-bg checked:border-transparent focus:outline-none"
					/>
				</div>
				<div className="w-full flex flex-row justify-between py-2 px-4">
					<div className="flex flex-col items-start">
						<p className="text-white font-bold">{title} </p>
						<p className="text-white font-light">{description} </p>
					</div>
					<div className="flex flex-row justify-evenly items-center w-24">
						<img
							src={Edit}
							alt="Edit button"
							className="cursor-pointer"
							onClick={async () => {
								setShowUpdateModal(true);
								setUpdateID(id)
							}}
						/>
						<img
							src={Remove}
							alt="Remove button"
							className="cursor-pointer p-4"
							onClick={async () => {
								setShouldFetch(true);
								removeTask(id);
							}}
						/>
					</div>
				</div>
			</div>
			<ProgressBar completed={completed} />
		</div>
	);
}
