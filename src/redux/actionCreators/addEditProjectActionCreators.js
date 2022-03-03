export function setMode(mode) {
	return {
		type: "ADD_EDIT_PROJECT_SET_MODE",
		payload: {
			mode
		}
	};
}

export function setProject(projectId) {
	return {
		type: "ADD_EDIT_PROJECT_SET_PROJECT",
		payload: {
			projectId
		}
	};
}