import { useSelector } from "react-redux";

import styles from "./BarGraph.module.css";

export default function BarGraph({ mode, weekId }) {
  const projectId = useSelector(
    (state) => state.projectEditor.currentProjectId
  );
  const week = useSelector((state) => state.projects[projectId].weeks[weekId]);

  const deadline = useSelector((state) => state.projects[projectId].deadline);
  const hourGoal = useSelector((state) => state.projects[projectId].hourGoal);
  const dailyRate =
    deadline && hourGoal ? 3 /* <=== Calculate daily rate */ : null;

  return (
    <div
      className={`${styles.barGraph_container} ${mode === "active" && styles.active} `}
		>
      {}
    </div>
  );
}
