import { useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./WeekList.module.css";

import Week from "./Week.js";

export default function WeekList() {
  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const weekIds = Object.keys(useSelector((state) => state.projects[projectId].weeks));

  const weeksContainer = useRef(null);

  const dayIndex = new Date().getDay();

  return (
    <div ref={weeksContainer} className={styles.container}>
      <div className={styles.daysContainer}>
        <h1 className={dayIndex === 0 ? styles.currentDay : ""}>S</h1>
        <h1 className={dayIndex === 1 ? styles.currentDay : ""}>M</h1>
        <h1 className={dayIndex === 2 ? styles.currentDay : ""}>T</h1>
        <h1 className={dayIndex === 3 ? styles.currentDay : ""}>W</h1>
        <h1 className={dayIndex === 4 ? styles.currentDay : ""}>T</h1>
        <h1 className={dayIndex === 5 ? styles.currentDay : ""}>F</h1>
        <h1 className={dayIndex === 6 ? styles.currentDay : ""}>S</h1>
      </div>

      {weekIds.map((weekId, index) => (
        <Week id={weekId} container={weeksContainer} key={index} />
      ))}
    </div>
  );
}
