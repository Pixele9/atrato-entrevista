import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { createTask } from "../api";

export default function Modal(props) {
	const { showModal, setShowModal, setShoudFetch } = props;
	const modalRef = useRef();

	const [task, setTask] = useState({
		title: "",
		description: "",
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

	function newTask(data) {
		console.log("CALLING new Task");
		if (data.title === "" || data.description === "") {
			alert("Please fill the required data");
		} else {
			createTask(data);
			console.log("New task created")
		}
	};

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
						className="w-60 py-8 w-2/6 shadow-2xl z-10 light-bg rounded-xl relative"
					>
						<button
							className="textl-xl font-bold top-2 right-2 absolute outline-none"
							onClick={() => setShowModal(!showModal)}
						>
							X
						</button>
						<p className="font-bold text-lg">New Task</p>
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
						</div>

						<button
							className="px-4 py-2 rounded-xl cyan-bg text-black mt-4 outline-none"
							onClick={() => {
								if(task.title === "" || task.description === "") {
									alert("Please fill the required information")
								} else {
									newTask(task)
									setShowModal(false)
									setShoudFetch(true)
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
