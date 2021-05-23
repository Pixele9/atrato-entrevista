import React from 'react'

export default function Card(props) {
	const { title, description } = props
	return (
		<div className="w-3/4 h-22 light-bg rounded-xl shadow-2xl">
			<p>{ title } </p>
			<p>{ description } </p>
			<div className="bg-gray-400 w-full h-1 rounded"></div>
		</div>
	)
}
