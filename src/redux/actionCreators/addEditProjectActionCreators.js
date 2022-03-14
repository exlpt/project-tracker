export function setMode(mode) {
	return {
		type: "SET_MODE",
		payload: {
			mode
		}
	};
}

export function setProject(projectId) {
	return {
		type: "SET_PROJECT",
		payload: {
			projectId
		}
	};
}