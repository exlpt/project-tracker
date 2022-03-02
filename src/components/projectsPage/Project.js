import { useSelector, useDispatch } from "react-redux";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";

export default function Project(props) {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.projects[props.projectId]);

  function deleteThisProject() {
    dispatch(projectsActions.deleteProject(props.projectId));
  }

  return (
    <div>
      <div>
        <div style={{ background: project.themeColor }}>
          <h1>{project.title}</h1>
        </div>
      </div>

      <div>
        <button onClick={() => {}}>Edit</button>
        <button onClick={deleteThisProject}>Delete</button>
      </div>
    </div>
  );
}
