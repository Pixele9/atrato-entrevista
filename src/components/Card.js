import React from 'react'

import ProgressBar from './ProgressBar';

import Edit from "../assets/Edit.svg";
import Remove from "../assets/Remove.svg";

import { removeTask } from "../api";

export default function Card(props) {
	const { title, description, id, setShouldFetch, setShowModal } = props
	return (
		<div className="w-full h-22 light-bg rounded-xl shadow-2xl flex flex-col mt-4">
			<div className="w-full flex flex-row justify-between py-2 px-4">
				<div className="flex flex-col items-start">
					<p className="text-white font-bold">{ title } </p>
					<p className="text-white font-light">{ description } </p>
				</div>
				<div className="flex flex-row justify-evenly items-center w-24">
					<img src={Edit} alt="Edit button" className="cursor-pointer" onClick={async () => {
						setShowModal(true)
					}}/>
					<img src={Remove} alt="Remove button" className="cursor-pointer p-4" onClick={async () => { 
						setShouldFetch(true)
						removeTask(id)
					}} />
				</div>
			</div>
			<ProgressBar completed={ 30 } />
		</div>
	)
}
