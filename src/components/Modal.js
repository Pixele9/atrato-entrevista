import React, { useEffect, useRef, useCallback } from 'react'

import { useSpring, animated } from "react-spring";

export default function Modal(props) {
	const { showModal, setShowModal } = props;
	const modalRef = useRef();

	const animation = useSpring({
		config: {
			duration: 100
		},
		opacity: showModal ? 1 : 0,
		transform: showModal ? `translateY(0%)` : 'translateY(-100%'
	})

	const closeModal = e => {
		if(modalRef.current === e.target) {
			console.log("target: ", e.target)
			setShowModal(false);
		}
	}

	const keyPress = useCallback((e) => {
		if(e.key === "Escape" && showModal) setShowModal(false)
	}, [showModal, setShowModal])

	useEffect(() => {
		document.addEventListener("keydown", keyPress)
		return () => document.removeEventListener("keydown", keyPress)
	}, [keyPress])

	return (
		<> 
		{ showModal ? (
			<div ref={modalRef} onClick={closeModal} className="w-full h-screen flex flex-col text-center items-center justify-center absolute bg-black bg-opacity-30">
				<animated.div style={animation} className="w-60 py-8 w-2/6 shadow-2xl z-10 light-bg rounded-xl relative">
					<button className="textl-xl font-bold top-2 right-2 absolute outline-none" onClick={() => setShowModal(!showModal)}>X</button>
					<p className="font-bold text-lg">New Task</p>
					<div className="flex flex-col px-4 mt-4">
						<input type="text" className="border-2 border-gray-500 rounded-lg p-2 light-bg outline-none" placeholder="Title" />
						<input type="text" className="border-2 border-gray-500 rounded-lg p-2 mt-2 light-bg outline-none" placeholder="Description" />
					</div>
					<button className="px-4 py-2 rounded-xl cyan-bg text-black mt-4 outline-none">Add Task</button>
				</animated.div>
			</div>
		) : null} 
		</>
	)
}
