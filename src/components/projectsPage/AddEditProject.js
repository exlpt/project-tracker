import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as projectsActions from "../../redux/actionCreators/projectsActionCreators.js";
import * as addEditProjectActions from "../../redux/actionCreators/addEditProjectActionCreators.js";

import styles from "./AddEditProject.module.css";

export default function AddEditProject() {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.addEditProject.mode);
  const projectId = useSelector((state) => state.addEditProject.projectId);
  const project = useSelector((state) => (projectId ? state.projects[projectId] : null));

  const [formData, setFormData] = useState({
    deadlineEnabled: false,
    deadline: "2022-01-01",
    hourGoalEnabled: false,
    hourGoal: 0,
    title: "Untitled Project",
    background: "",
    projectTheme: "#57FF3D",
  });

  useEffect(() => {
    mode === "edit" &&
      setFormData(() => ({
        deadlineEnabled: !!project.deadline,
        deadline: project.deadline,
        hourGoalEnabled: !!project.hourGoal,
        hourGoal: project.hourGoal,
        title: project.title,
        background: project.bannerImage,
        projectTheme: project.themeColor,
      }));
  }, [projectId, mode]);

  function setFormToDefault() {
    setFormData({
      deadlineEnabled: false,
      deadline: "2022-01-01",
      hourGoalEnabled: false,
      hourGoal: 0,
      title: "Untitled Project",
      background: "",
      projectTheme: "#57FF3D",
    });
  }

  function addProject(event) {
    event.preventDefault();

    dispatch(
      projectsActions.addProject(
        formData.title,
        formData.projectTheme,
        formData.background,
        formData.deadlineEnabled ? formData.deadline : null,
        formData.hourGoalEnabled ? formData.hourGoal : null
      )
    );

    setFormToDefault();
  }

  function editProject(event) {
    event.preventDefault();

    projectId &&
      dispatch(
        projectsActions.editProject(
          projectId,
          formData.title,
          formData.projectTheme,
          formData.background,
          formData.deadlineEnabled ? formData.deadline : null,
          formData.hourGoalEnabled ? formData.hourGoal : null
        )
      );

    dispatch(addEditProjectActions.setMode("add"));
    dispatch(addEditProjectActions.setProject(null));

    setFormToDefault();
  }

  function updateForm(event) {
    const { value, checked, files, type, name } = event.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  }

  function cancelEdit() {
    dispatch(addEditProjectActions.setMode("add"));
    setFormToDefault();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainText}>{mode === "edit" ? "Edit Project" : "Add Project"}</h1>

      <form onSubmit={mode === "edit" ? editProject : addProject} className={styles.form}>
        <label>
          <div className={`${styles.form__checkboxContainer} ${styles.form__checkboxContainer_inLabel}`}>
            <input
              type="checkbox"
              name="deadlineEnabled"
              checked={formData.deadlineEnabled}
              onChange={updateForm}
            />
            <span className={styles.form__checkbox}></span>
          </div>
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline || "2022-01-01"}
            disabled={!formData.deadlineEnabled}
            onChange={updateForm}
          />
        </label>

        <label>
          <div className={`${styles.form__checkboxContainer} ${styles.form__checkboxContainer_inLabel}`}>
            <input
              type="checkbox"
              name="hourGoalEnabled"
              checked={formData.hourGoalEnabled}
              onChange={updateForm}
            />
            <span className={styles.form__checkbox}></span>
          </div>
          Hour goal
          <input
            type="number"
            name="hourGoal"
            value={formData.hourGoal || 0}
            disabled={!formData.hourGoalEnabled}
            onChange={updateForm}
          />
        </label>

        <label>
          Title
          <input type="text" name="title" value={formData.title} onChange={updateForm} />
        </label>

        <label className={styles.form__fileLabel}>
          Background
          <input type="file" name="background" onChange={updateForm} />
        </label>

        <label>
          Project theme
          <input type="color" name="projectTheme" value={formData.projectTheme} onChange={updateForm} />
        </label>

        <div className={styles.form__btns}>
          <button className={styles.form__btn}>{mode === "edit" ? "Save" : "Add"}</button>
          {mode === "edit" && (
            <button onClick={cancelEdit} className={`${styles.form__btn} ${styles.form__btn_cancel}`}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
