import React from 'react'

import { useHistory } from "react-router-dom";

export default function Home() {
	const history = useHistory();

	return (
		<div className="w-full h-screen">
			<div className="w-full bg-blue-200">
				<button onClick={() => history.push("/todos")}>Take me to my TO-DOs</button>
			</div>
		</div>
	)
}
