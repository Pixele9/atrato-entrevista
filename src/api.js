export const getTasks = (collection) => fetch(`http://localhost:5000/collections/${collection}`).then(resp => resp.json());
export const getCollections = () => fetch("http://localhost:5000/collections").then(resp => resp.json());
export const getTask = (id) => fetch(`http://localhost:5000/${id}`).then(resp => resp.json());

export const removeTask = (id) => fetch(`http://localhost:5000/${id}`, {
	method: "DELETE",
}).then(resp => resp.json());

export const createTask = (todo) => {
	fetch("http://localhost:5000/create", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todo)
	})
}

export const updateTask = (id, todo) => {
	fetch(`http://localhost:5000/${id}`, {
		method: "PUT",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todo)
	})
}
