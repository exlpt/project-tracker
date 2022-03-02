import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import projectsReducer from "./reducers/projectsReducer";

const store = createStore(
  combineReducers({ projects: projectsReducer }),
  composeWithDevTools()
);
export default store;
