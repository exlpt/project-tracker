import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setProjectId } from "../../redux/actionCreators/projectEditorActionCreators.js";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";
import * as addEditProjectActions from "../../redux/actionCreators/addEditProjectActionCreators.js";

import styles from "./Project.module.css";

export default function Project(props) {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.projects[props.projectId]);

  function deleteThisProject() {
    dispatch(projectsActions.deleteProject(props.projectId));
		dispatch(addEditProjectActions.setMode("add"));
  }
	
	function setAddEditProjectProjectId() {
		dispatch(addEditProjectActions.setProject(props.projectId));
		dispatch(addEditProjectActions.setMode("edit"));
	}

  return (
    <div>
      <Link to="/editor" onClick={() => dispatch(setProjectId(props.projectId))} className={styles.link}>
        <div style={{ background: project.themeColor }}>
          <h1>{project.title}</h1>
        </div>
      </Link>

      <div>
        <button onClick={setAddEditProjectProjectId}>Edit</button>
        <button onClick={deleteThisProject}>Delete</button>
      </div>
    </div>
  );
}
