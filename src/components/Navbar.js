import React, { useEffect, useState } from "react";

import Home from "../assets/Home.svg";
import { useHistory } from "react-router-dom";
import AddButton from "../assets/AddButton.svg";

import { getCollections } from "../api";

export default function Navbar() {
	const history = useHistory();
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		console.log("Collections: ", collections);
		const fetchCollections = async () => {
			const colls = await getCollections();
			console.log("Colls: ", collections);
			setCollections(colls);
		};
		fetchCollections();
	}, []);

	return (
		<div className="light-bg w-60 h-screen px-6 py-8 flex flex-col justify-between">
			<div>
				<div
					className="flex justify-center items-center bg-gray-600 rounded-lg p-2 cursor-pointer"
					onClick={() => history.push("/")}
				>
					<img src={Home} />
					<span className="ml-4">Home Page</span>
				</div>
					<p className="text-xl font-bold mt-8 p-2 hover:bg-gray-600 rounded-lg py-2 px-4 cursor-pointer" onClick={() => history.push("/collections")}>
						Collections
					</p>
					<div className="flex flex-col">
						{collections.map((coll) => (
							<div
								key={coll._id}
								className="mt-2 hover:bg-gray-600 rounded-lg py-2 px-4 cursor-pointer"
								onClick={() =>
									history.push(`/${coll.name}/${coll._id}`)
								}
							>
								{coll.name}
							</div>
						))}
					</div>
			</div>

			{/* <div className="flex flex-row items-center w-full h-22 p-2 bg-gray-600 rounded-xl shadow-2xl mt-4 cursor-pointer hover:scale-105 transition-all delay-100 transform" onClick={() => {}}>
				<img src={AddButton} />
				<p className="ml-4 text-sm">New Collection</p>
			</div> */}
			{/* <button className="w-full bg-cyan text-black px-2 py-4 rounded-xl ">New Collection</button> */}
		</div>
	);
}
