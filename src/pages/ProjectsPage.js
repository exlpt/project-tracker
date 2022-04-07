import ProjectList from "../components/projectsPage/ProjectList.js";
import AddEditProject from "../components/projectsPage/AddEditProject.js";

import tempLogo from "../assets/images/temp_logo.png";

import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img src={tempLogo} alt="" style={{ width: "70px" }} className={styles.profileContainer__pfp} />
        <h3 className={styles.profileContainer__username}>Temp_User</h3>
      </div>

      <h1 className={styles.mainText}>Your Projects</h1>

      <div className={styles.contentContainer}>
        <AddEditProject />

        <ProjectList />
      </div>
    </div>
  );
}
