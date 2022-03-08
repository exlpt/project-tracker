import store from "../store.js";

export function addProject(title, themeColor, bannerImage, deadline, hourGoal) {
  return {
    type: "PROJECTS_ADD_PROJECT",
    payload: {
      title,
      themeColor,
      bannerImage,
      deadline,
      hourGoal,
    },
  };
}

export function deleteProject(projectId) {
  return {
    type: "PROJECTS_DELETE_PROJECT",
    payload: {
      projectId,
    },
  };
}

export function addSplit(projectId, splitName, splitColor) {
  return {
    type: "PROJECTS_ADD_SPLIT",
    payload: {
      projectId,
      splitName,
      splitColor,
    },
  };
}

export function addWeek(projectId) {
  const defaultWeekSplits = store
    .getState()
    .projects[projectId].projectSplits.map((split) => ({
      name: split.name,
      time: 0,
    }));

  return {
    type: "PROJECTS_ADD_WEEK",
    payload: {
      projectId,
      defaultWeekSplits,
    },
  };
}

export function setSplitTime(projectId, weekId, dayIndex, splitName, time) {
  return {
    type: "PROJECTS_SET_SPLIT_TIME",
    payload: {
      projectId,
      weekId,
      dayIndex,
      splitName,
      time,
    },
  };
}
