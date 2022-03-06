import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";
import SplitList from "./SplitList.js";

export default function Splits() {
  const dispatch = useDispatch();

  const projectId = useSelector(
    (state) => state.projectEditor.currentProjectId
  );

  const projectSplitNames = useSelector((state) =>
    state.projects[projectId].projectSplits.map((split) => split.name)
  );

  const [formData, setFormData] = useState({
    name: null,
    color: null,
  });

  function updateFormState(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function addSplitToProject(event) {
    event.preventDefault();

    !projectSplitNames.some((splitName) => formData.name === splitName) &&
      dispatch(
        projectsActions.addSplit(projectId, formData.name, formData.color)
      );
  }

  return (
    <div>
      <h1>Splits</h1>

			<SplitList />

      <form onSubmit={addSplitToProject}>
        <input type="text" name="name" onChange={updateFormState} />
        <input type="color" name="color" onChange={updateFormState} />
        <button disabled={!(formData.color && formData.name)}>Submit</button>
      </form>
    </div>
  );
}
