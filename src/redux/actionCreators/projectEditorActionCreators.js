export function setProjectId(projectId) {
	return {
		type: "SET_PROJECT_ID",
		payload: {
			projectId
		}
	};
}

export function setWeekId(weekId) {
	return {
		type: "SET_WEEK_ID",
		payload: {
			weekId
		}
	};
}