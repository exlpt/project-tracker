import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import projectsReducer from "./reducers/projectsReducer.js";
import projectEditorReducer from "./reducers/projectEditorReducer.js";

const store = createStore(
  combineReducers({
    projects: projectsReducer,
    projectEditor: projectEditorReducer,
  }),
  composeWithDevTools()
);
export default store;
