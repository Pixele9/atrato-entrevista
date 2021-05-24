import React from 'react';

import Home from "../assets/Home.svg";
import { useHistory } from "react-router-dom";

export default function Navbar() {
	const history = useHistory();

	return (
		<div className="light-bg w-60 h-screen px-6 py-8">
			<div className="flex justify-center items-center gray-blue rounded p-2 cursor-pointer" onClick={() => history.push("/")}>
				<img src={Home} />
				<span className="ml-4">Home Page</span>
			</div>
			<p className="text-xl font-bold mt-8">Collections</p>	
		</div>
	)
}
