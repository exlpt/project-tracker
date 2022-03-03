import { useSelector, useDispatch } from "react-redux";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";
import * as addEditProjectActions from "../../redux/actionCreators/addEditProjectActionCreators.js";

export default function Project(props) {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.projects[props.projectId]);

  function deleteThisProject() {
    dispatch(projectsActions.deleteProject(props.projectId));
		dispatch(addEditProjectActions.setProject(null));
  }
	
	function setAddEditProjectProjectId() {
		dispatch(addEditProjectActions.setProject(props.projectId));
		dispatch(addEditProjectActions.setMode("edit"));
	}

  return (
    <div>
      <div>
        <div style={{ background: project.themeColor }}>
          <h1>{project.title}</h1>
        </div>
      </div>

      <div>
        <button onClick={setAddEditProjectProjectId}>Edit</button>
        <button onClick={deleteThisProject}>Delete</button>
      </div>
    </div>
  );
}
