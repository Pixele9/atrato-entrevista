import React from 'react'

import { useHistory } from "react-router-dom";

export default function Home() {
	const history = useHistory();

	return (
		<div className="w-full h-screen bg-white flex flex-col">
			<div className="flex items-center justify-center h-1/2 bg-black">
				<p className="font-bold text-8xl bg-gradient-to-tr from-cyan to-green-500  text-transparent bg-clip-text">
					Welcome to your To-Dos
				</p>
			</div>
			<div className="w-full h-1/2 flex mt-12 justify-center">
				<button className="bg-cyan rounded-xl py-4 px-6 outline-none h-20 text-xl shadow-sm hover:shadow-lg hover:scale-105 transform transition delay-150 text-black" onClick={() => history.push("/collections")}>Take me there!</button>
			</div>
		</div>
	)
}
