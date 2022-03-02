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
