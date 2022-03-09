import { useSelector } from "react-redux";

import styles from "./BarGraph.module.css";

export default function BarGraph({ mode, weekId }) {
  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const week = useSelector((state) => state.projects[projectId].weeks[weekId]);

  const deadline = useSelector((state) => state.projects[projectId].deadline);
  const hourGoal = useSelector((state) => state.projects[projectId].hourGoal);
  const dailyRate = deadline && hourGoal ? 3 /* <=== Calculate daily rate */ : null;

  const graphHeight = mode === "active" ? 120 : 60;

  const barScaleFactor =
    graphHeight /
    week.reduce((acc, currentDay) => {
      const dayTime = addSplitsInDay(currentDay);
      return dayTime > acc ? dayTime : acc;
    }, addSplitsInDay(week[0]));

  const fullTimeHue = 126;
  const emptyTimeHue = 1;
  const noTimeColor = "rgb(88, 88, 88)";

  function addSplitsInDay(day) {
    return day.reduce((acc, split) => acc + split.time, 0);
  }

  return (
    <div
      className={`${styles.container} ${mode === "active" && styles.active}`}
      style={{
        height: `${graphHeight}px`,
      }}
    >
      {week.map((day, index) => {
        const barHeight = addSplitsInDay(day) * barScaleFactor;
        const interpFlatness = 30;
        const barHue =
          (emptyTimeHue + interpFlatness) *
            Math.pow(
              (fullTimeHue + interpFlatness) / (emptyTimeHue + interpFlatness),
              barHeight / graphHeight
            ) -
          interpFlatness;

        return (
          <div
            className={styles.timeBar}
            style={{
              height: `${barHeight}px`,
              background: `hsl(${barHue}, 72%, 50%)`,
            }}
            key={index}
          ></div>
        );
      })}
    </div>
  );
}
