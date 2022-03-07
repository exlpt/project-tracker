export function setProjectId(projectId) {
	return {
		type: "PROJECT_EDITOR_SET_PROJECT_ID",
		payload: {
			projectId
		}
	};
}

export function setWeekId(weekId) {
	return {
		type: "PROJECT_EDITOR_SET_WEEK_ID",
		payload: {
			weekId
		}
	};
}