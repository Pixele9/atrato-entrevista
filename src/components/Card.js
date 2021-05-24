import React from 'react'

import ProgressBar from './ProgressBar';

export default function Card(props) {
	const { title, description, completed } = props
	return (
		<div className="w-full h-22 light-bg rounded-xl shadow-2xl flex flex-col mt-4">
			<div className="w-full flex flex-row p-4 ">
				<p className="text-white font-bold">{ title } </p>
				<p className="text-white font-light">{ description } </p>
			</div>
			<ProgressBar completed={ 30 } />
		</div>
	)
}
