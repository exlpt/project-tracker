import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as projectsActions from "./redux/actionCreators/projectsActionCreators.js";
import * as projectEditorActions from "./redux/actionCreators/projectEditorActionCreators.js";

import App from "./App.js";

import { tempProjects } from "./tempData.js";

tempProjects.forEach((project) => {
  store.dispatch(
    projectsActions.addProject(
      project.title,
      project.themeColor,
      project.bannerImage,
      project.deadline,
      project.hourGoal
    )
  );
});

const defaultProjectId = Object.keys(store.getState().projects)[0];
const defaultWeekId = Object.keys(
  store.getState().projects[defaultProjectId].weeks
)[0];
store.dispatch(projectEditorActions.setProjectId(defaultProjectId));
store.dispatch(projectEditorActions.setWeekId(defaultWeekId));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
