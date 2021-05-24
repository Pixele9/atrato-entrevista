import React, { useEffect, useState } from 'react';

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

import { getTasks } from "../api";

export default function Todo() {
	const [ joke, setJoke ] = useState("");
	const [ isLoading, setLoading ] = useState(false);
	const [ items, setItems ] = useState([]);
	const [ taskCount, setTaskCount ] = useState(0);
	const [ showModal, setShowModal ] = useState(false);

	useEffect(() => {
		setLoading(true)
		const fetchGoals = async () => {
			const goals = await getTasks();
			console.log("GOALS: ", goals)
			setItems(goals.todos)
			setTaskCount(goals.count)
		}

		const URL = "https://api.chucknorris.io/jokes/random";
		fetch(URL)
			.then(resp => resp.json())
			.then(data => {
				setJoke(data.value)
				setLoading(false)
			})

		fetchGoals();
	}, [])

	return (
		<div className="flex flex-row">
			<Modal showModal={showModal} setShowModal={setShowModal} />
			<Navbar />
			<div className="w-full h-screen text-center flex flex-col items-center flex-grow">
				<div className="light-bg rounded-2xl px-12 py-4 mt-8 flex items-center justify-center max-w-lg">
					{ isLoading ? 
						(<div class="loader"></div>)
						: (
							<div className="flex flex-col items-start">
								<h1 className="text-lg font-bold">Quote of the day</h1>
								<p className="font-light break-words">"{ joke }"</p>
							</div>)
					}
				</div>

				<div className="flex justify-start w-1/2">
					<h1 className="text-2xl font-bold flex justify-start mt-12">Money</h1>
				</div>
				<div className="flex flex-row w-1/2 h-22 p-4 light-bg rounded-xl shadow-2xl mt-4 cursor-pointer" onClick={() => {
					setShowModal(!showModal);
				}}>
					New Task	
				</div>

				{/* <input type="text" placeholder="Title" onChange={(e) => {
					setTask({...task, title: e.target.value})
				}}/>
				<input type="text" placeholder="Description" onChange={(e) => {
					setTask({...task, description: e.target.value})
				}}/>

				<button className="w-22 p-2" onClick={() => {
					console.log("TASKS: ", tasks)
					setTasks({ ...tasks, task })
				}}>New Task</button> */}

				<div className="flex justify-start w-1/2">
					<h3 className="text-lg font-bold mt-8">Tasks - { taskCount }</h3>
				</div>
				<div className="task-container flex flex-col w-1/2 items-center">
					{items.map(item => (
						<Card key={item.id} title={item.title} description={item.description} />
					))}
				</div>
			</div>
		</div>
	)
}
