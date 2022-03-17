import store from "../store.js";

export function addProject(title, themeColor, bannerImage, deadline, hourGoal) {
  return {
    type: "ADD_PROJECT",
    payload: {
      title,
      themeColor,
      bannerImage,
      deadline,
      hourGoal,
    },
  };
}

export function editProject(projectId, title, themeColor, bannerImage, deadline, hourGoal) {
  return {
    type: "EDIT_PROJECT",
    payload: {
      projectId,
      title,
      themeColor,
      bannerImage,
      deadline,
      hourGoal,
    },
  };
}

export function editDates(projectId, startDate, dateLastOpened) {
  return {
    type: "EDIT_DATES",
    payload: {
			projectId,
      startDate,
      dateLastOpened,
    },
  };
}

export function deleteProject(projectId) {
  return {
    type: "DELETE_PROJECT",
    payload: {
      projectId,
    },
  };
}

export function addWeek(projectId) {
  const defaultWeekSplits = store.getState().projects[projectId].projectSplits.map((split) => ({
    name: split.name,
    time: 0,
  }));

  return {
    type: "ADD_WEEK",
    payload: {
      projectId,
      defaultWeekSplits,
    },
  };
}

export function setProjectTotalTime(projectId, time) {
  return {
    type: "SET_TOTAL_TIME",
    payload: {
      projectId,
      time,
    },
  };
}

export function addSplit(projectId, splitName, splitColor) {
  return {
    type: "ADD_SPLIT",
    payload: {
      projectId,
      splitName,
      splitColor,
    },
  };
}

export function deleteSplit(projectId, splitName) {
  return {
    type: "DELETE_SPLIT",
    payload: {
      projectId,
      splitName,
    },
  };
}

export function setDaySplitTime(projectId, weekId, dayIndex, splitName, time) {
  return {
    type: "SET_DAY_SPLIT_TIME",
    payload: {
      projectId,
      weekId,
      dayIndex,
      splitName,
      time,
    },
  };
}
