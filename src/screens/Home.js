import React from 'react'

import { useHistory } from "react-router-dom";

import Arrow from "../assets/Arrow.svg";

export default function Home() {
	const history = useHistory();

	return (
		<div className="w-full h-screen bg-white flex flex-col">
			<div className="flex items-center justify-center h-1/2" style={{background: "#191920" }}>
				<p className="font-bold text-8xl bg-gradient-to-tr from-cyan to-green-500  text-transparent bg-clip-text">
					Welcome to your To-Dos
				</p>
			</div>
			<div className="w-full h-1/2 flex mt-12 justify-center">
				<button className="flex items-center space-x-4 bg-cyan rounded-xl py-2 px-6 outline-none h-20 text-xl shadow-sm hover:shadow-lg hover:scale-105 transform transition delay-150 text-white" style={{background: "#191920" }} onClick={() => history.push("/collections")}>
					<p>Take me there!</p>
					<img src={Arrow} />
				</button>
			</div>
		</div>
	)
}
