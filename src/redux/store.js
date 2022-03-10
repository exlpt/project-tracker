import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import projectsReducer from "./reducers/projectsReducer.js";
import projectEditorReducer from "./reducers/projectEditorReducer.js";
import addEditProjectsReducer from "./reducers/addEditProjectReducer.js";

import updateTotalProjectTime from "./middleware/updateTotalProjectTime.js";

const store = createStore(
  combineReducers({
    projects: projectsReducer,
    projectEditor: projectEditorReducer,
    addEditProject: addEditProjectsReducer
  }),
  composeWithDevTools(applyMiddleware(updateTotalProjectTime))
);
export default store;
