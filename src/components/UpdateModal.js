import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { updateTask, getCollections, getTask } from "../api";

export default function UpdateModal(props) {
	const { showUpdateModal, setShowUpdateModal, setShouldFetch, updateID, updateName } = props;
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
		opacity: showUpdateModal ? 1 : 0,
		transform: showUpdateModal ? `translateY(0%)` : `translateY(-100%)`,
	});

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			console.log("target: ", e.target);
			setShowUpdateModal(false);
		}
	};

	const keyPress = useCallback(
		(e) => {
			if (e.key === "Escape" && showUpdateModal) setShowUpdateModal(false);
		},
		[showUpdateModal, setShowUpdateModal]
	);

	useEffect(() => {
		document.addEventListener("keydown", keyPress);
		return () => document.removeEventListener("keydown", keyPress);
	}, [keyPress]);

	useEffect(() => {
		const fetchTask = async (id) => {
			const mongoTask = await getTask(id);
			setTask({
				title: mongoTask.title,
				description: mongoTask.description,
				category: mongoTask.category
			})
		};
		fetchTask(updateID);

	}, [updateID])

	useEffect(() => {
		const fetchCollections = async () => {
			const colls = await getCollections();
			console.log("Colls: ", collections);
			setCollections(colls);
		};
		fetchCollections();
	}, []);

	function callUpdateTask(id, data) {
		if (data.title === "" || data.description === "") {
			alert("Please fill the required data");
		} else {
			console.log("DATA to create task: ", data);
			updateTask(id, data);
			console.log("Task has been updated");
		}
	}

	return (
		<>
			{showUpdateModal ? (
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
							onClick={() => setShowUpdateModal(!showUpdateModal)}
						>
							X
						</button>
						<p className="font-bold text-lg">Edit Task</p>
						<div className="flex flex-col px-4 mt-4">
							<input
								type="text"
								className="border-2 border-gray-500 rounded-lg p-2 light-bg outline-none"
								placeholder="Title"
								value={task.title}
								onChange={(e) => {
									setTask({ ...task, title: e.target.value });
								}}
							/>
							<input
								type="text"
								className="border-2 border-gray-500 rounded-lg p-2 mt-2 light-bg outline-none"
								placeholder="Description"
								value={task.description}
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
									<option key={el._id} value={el._id}>{el.name}</option>
								))}
							</select>
						</div>

						<button
							className="px-4 py-2 rounded-xl cyan-bg text-black mt-4 outline-none"
							onClick={async () => {
								if (
									task.title === "" ||
									task.description === ""
								) {
									alert(
										"Please fill the required information"
									);
								} else {
									const resp = await callUpdateTask(updateID, task);
									console.log("RESPPPP:: ", resp)
									setShowUpdateModal(false);
									setShouldFetch(true);
								}
							}}
							// onClick={newTask(task)}
						>
							Update Task
						</button>
					</animated.div>
				</div>
			) : null}
		</>
	);
}
