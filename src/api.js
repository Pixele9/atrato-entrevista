export const getTasks = () => fetch("http://localhost:5000/").then(resp => resp.json());
