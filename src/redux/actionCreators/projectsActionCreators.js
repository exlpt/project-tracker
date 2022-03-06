export function addProject(title, themeColor, bannerImage, deadline, hourGoal) {
  return {
    type: "PROJECTS_ADD_PROJECT",
    payload: {
			title,
			themeColor,
			bannerImage,
			deadline,
			hourGoal
		},
  };
}

export function deleteProject(projectId) {
	return {
		type: "PROJECTS_DELETE_PROJECT",
		payload: {
			projectId
		}
	}
}

export function addSplit(projectId, splitName, splitColor) {
	return {
		type: "PROJECTS_ADD_SPLIT",
		payload: {
			projectId,
			splitName,
			splitColor
		}
	};
}
