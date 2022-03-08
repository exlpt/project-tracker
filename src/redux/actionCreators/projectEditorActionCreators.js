export function setProjectId(projectId) {
	return {
		type: "PROJECT_EDITOR_SET_PROJECT_ID",
		payload: {
			projectId
		}
	};
}