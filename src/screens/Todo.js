import React, { useEffect, useState } from 'react';

import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Todo() {
	const [ joke, setJoke ] = useState("");
	const [ isLoading, setLoading ] = useState(false);
	const [ task, setTask ] = useState({
		title: "",
		description: ""
	});
	const [ tasks, setTasks ] = useState([
		{
			title: "Drink Water",
			description: "Stay hydraterd"
		}, 
		{
			title: "Drink Water",
			description: "Stay hydraterd"
		}
	])

	useEffect(() => {
		console.log("FIRST LOAD")	
		setLoading(true)
		const URL = "https://api.chucknorris.io/jokes/random";
		fetch(URL)
			.then(resp => resp.json())
			.then(data => {
				setJoke(data.value)
				setLoading(false)
			})
	}, [])

	return (
		<div className="flex flex-row">
			<Navbar />
			<div className="w-full h-screen text-center flex flex-col items-center flex-grow">
				<div className="light-bg rounded-2xl px-12 py-4 mt-8 flex items-center justify-center max-w-lg">
					{ isLoading ? 
						(<div class="loader"></div>)
						: (
							<div className="flex flex-col items-start">
								<h1 className="text-white text-lg font-bold">Quote of the day</h1>
								<p className="text-white font-light break-words">"{ joke }"</p>
							</div>
						)
					}
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

				<div className="task-container flex justify-around">
					{tasks.map(task => (
						<Card title={task.title} description={task.description}/>
					))}
				</div>
			</div>
		</div>
	)
}
