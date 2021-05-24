import React from 'react'

export default function ProgressBar(props) {
	const { completed } = props;

	const containerStyles = {
		height: 20,
		width: '100%',
		backgroundColor: "#e0e0de",
		borderRadius: 50,
	}

	const fillerStyles = {
		height: '100%',
		width: `${completed}%`,
		backgroundColor: "#4DFFF4",
		transition: 'width 1s ease-in-out',
		borderRadius: 'inherit',
		textAlign: 'right'
	}

	const labelStyles = {
		padding: 5,
		color: "#191920",
		fontWeight: 'bold'
	}

	return (
		<div className="p-4">
			<div style={containerStyles}>
				<div style={fillerStyles}>
					<span style={labelStyles}>{`${completed}%`}</span>
				</div>
			</div>	
		</div>
	)
}
