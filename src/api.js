export const getTasks = () => {
	fetch("/")
		.then(resp => resp.json)
}