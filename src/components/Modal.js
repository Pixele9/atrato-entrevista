import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { createTask, getCollections } from "../api";

export default function Modal(props) {
	const { showModal, setShowModal, setShouldFetch } = props;
	const modalRef = useRef();

	const [collections, setCollections] = useState([]);

	const [task, setTask] = useState({
		title: "",
		description: "",
		category: "", // collection
	});

	const animation = useSpring({
		config: {
			duration: 100,
		},
		opacity: showModal ? 1 : 0,
		transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
	});

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			console.log("target: ", e.target);
			setShowModal(false);
		}
	};

	const keyPress = useCallback(
		(e) => {
			if (e.key === "Escape" && showModal) setShowModal(false);
		},
		[showModal, setShowModal]
	);

	useEffect(() => {
		document.addEventListener("keydown", keyPress);
		return () => document.removeEventListener("keydown", keyPress);
	}, [keyPress]);

	useEffect(() => {
		const fetchCollections = async () => {
			const colls = await getCollections();
			console.log("Colls: ", collections);
			setCollections(colls);
		};
		fetchCollections();
	}, []);

	function newTask(data) {
		console.log("CALLING new Task");
		if (data.title === "" || data.description === "") {
			alert("Please fill the required data");
		} else {
			console.log("DATA to create task: ", data);
			createTask(data);
			console.log("New task created");
		}
	}

	return (
		<>
			{showModal ? (
				<div
					ref={modalRef}
					onClick={closeModal}
					className="w-full h-screen flex flex-col text-center items-center justify-center absolute bg-black bg-opacity-30"
				>
					<animated.div
						style={animation}
						className="py-8 w-2/6 shadow-2xl z-10 light-bg rounded-xl relative"
					>
						<button
							className="textl-xl font-bold top-2 right-2 absolute outline-none"
							onClick={() => setShowModal(!showModal)}
						>
							X
						</button>
						<p className="font-bold text-lg">Task</p>
						<div className="flex flex-col px-4 mt-4">
							<input
								type="text"
								className="border-2 border-gray-500 rounded-lg p-2 light-bg outline-none"
								placeholder="Title"
								onChange={(e) => {
									setTask({ ...task, title: e.target.value });
								}}
							/>
							<input
								type="text"
								className="border-2 border-gray-500 rounded-lg p-2 mt-2 light-bg outline-none"
								placeholder="Description"
								onChange={(e) => {
									setTask({
										...task,
										description: e.target.value,
									});
								}}
							/>
							<select
								class="border-2 border-gray-500 rounded-lg mt-2 text-gray-400 h-10 pl-2 pr-10 light-bg hover:border-gray-400 focus:outline-none appearance-none"
								onChange={(e) => {
									setTask({
										...task,
										category: e.target.value,
									})
									console.log("TASK: ", e.target.value)
								}}
							>
								<option selected>Choose a Collection</option>
								{collections.map((el) => (
									<option value={el._id}>{el.name}</option>
								))}
							</select>
						</div>

						<button
							className="px-4 py-2 rounded-xl cyan-bg text-black mt-4 outline-none"
							onClick={() => {
								if (
									task.title === "" ||
									task.description === ""
								) {
									alert(
										"Please fill the required information"
									);
								} else {
									newTask(task);
									setShowModal(false);
									setShouldFetch(true);
								}
							}}
							// onClick={newTask(task)}
						>
							Add Task
						</button>
					</animated.div>
				</div>
			) : null}
		</>
	);
}
