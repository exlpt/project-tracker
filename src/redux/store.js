import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import projectsReducer from "./reducers/projectsReducer.js";
import addEditProjectsReducer from "./reducers/addEditProjectReducer.js";

const store = createStore(
  combineReducers({
    projects: projectsReducer,
    addEditProject: addEditProjectsReducer
  }),
  composeWithDevTools()
);
export default store;
