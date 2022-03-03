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

export function editProject(projectId, title, themeColor, bannerImage, deadline, hourGoal) {
  return {
    type: "PROJECTS_EDIT_PROJECT",
    payload: {
			projectId,
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
