import { useSelector } from "react-redux";

import Project from "./Project.js";

import styles from "./ProjectList.module.css";

export default function ProjectList() {
  const projectIds = useSelector((state) => Object.keys(state.projects));

  return (
    <div className={styles.container}>
      {projectIds.map((projectId, index) => (
        <Project projectId={projectId} key={index} />
      ))}
    </div>
  );
}
