import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as projectsActions from "./redux/actionCreators/projectsActionCreators.js";
import * as projectEditorActions from "./redux/actionCreators/projectEditorActionCreators.js";

import App from "./App.js";

// Grab project data from API (grabbing from temp file)
import { tempProjects } from "./tempData.js";

tempProjects.forEach((project) => {
  // Add project
  store.dispatch(
    projectsActions.addProject(
      project.title,
      project.themeColor,
      project.bannerImage,
      project.deadline,
      project.hourGoal
    )
  );

  // Set default project
  if (!Object.keys(store.getState().projects)[1]) {
    const defaultProjectId = Object.keys(store.getState().projects)[0];
    store.dispatch(projectEditorActions.setProjectId(defaultProjectId));
  }

  const projectIds = Object.keys(store.getState().projects);
  const currentProjectId = projectIds[projectIds.length - 1];

  // Set project dates
  store.dispatch(projectsActions.editDates(currentProjectId, project.startDate, project.dateLastOpened));

  // Add projectSplits to project
  project.projectSplits.forEach((split) => {
    store.dispatch(projectsActions.addSplit(currentProjectId, split.name, split.color));
  });

  // Add weeks
  for (let i = 1; i < Object.keys(project.weeks).length; i++) {
    store.dispatch(projectsActions.addWeek(currentProjectId));
  }

  // Set split times
  const weekIds = Object.keys(store.getState().projects[currentProjectId].weeks);
  const splitNames = project.projectSplits.map((split) => split.name);
  for (let weekIndex = 0; weekIndex < weekIds.length; weekIndex++) {
    const weekId = weekIds[weekIndex];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      for (let splitIndex = 0; splitIndex < splitNames.length; splitIndex++) {
        const splitName = splitNames[splitIndex];

        store.dispatch(
          projectsActions.setDaySplitTime(
            currentProjectId,
            weekId,
            dayIndex,
            splitName,
            project.weeks[weekIndex][dayIndex][splitIndex].time
          )
        );
      }
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
