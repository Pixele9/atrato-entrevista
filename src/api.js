export const getTasks = () => fetch("http://localhost:5000/").then(resp => resp.json());

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
