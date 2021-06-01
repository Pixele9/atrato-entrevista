import React, { useEffect, useState } from 'react';

import { getCollections } from "../api";
import Card from "../components/CollectionCard";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

import AddButton from "../assets/AddButton.svg";

export default function Collections() {
	const [ collections, setCollections ] = useState([]);
	const [ shouldFetch, setShouldFetch ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);

	useEffect(() => {
		const fetchCollections = async () => {
			const colls = await getCollections();
			setCollections(colls)
			console.log("COLLECTIONS: ", colls)
		}
		fetchCollections();
	}, [])

	useEffect(() => {
		if(shouldFetch) {
			const fetchCollections = async () => {
				const colls = await getCollections();
				setCollections(colls)
				console.log("COLLECTIONS: ", colls)
			}
			fetchCollections();
		}
	}, [shouldFetch, setShouldFetch])

	return (
		<div className="flex flex-grow">
			<Modal showModal={showModal} setShowModal={setShowModal} shouldFetch={shouldFetch} setShouldFetch={setShouldFetch} modifierName="Collection"/>
			<Navbar />
			<div className="w-full h-screen flex flex-col items-center overflow-y-auto p-12">
				<p className="text-4xl justify-start font-bold">Collections</p>
				<div className="flex flex-row items-center w-1/2 h-22 p-2 light-bg rounded-xl shadow-2xl mt-4 cursor-pointer hover:scale-105 transition-all delay-100 transform" onClick={() => {setShowModal(true)}}>
					<img src={AddButton} />
					<p className="ml-4 text-lg">New Collection</p>
				</div>
				<div className="mt-8 w-full h-full flex flex-col items-center">
					{collections.map(item => (
						<Card key={item._id} title={item.name} description={item.description} routeName={item.name} routeID={item._id} />
					))}
				</div>
			</div>
		</div>
	)
}
