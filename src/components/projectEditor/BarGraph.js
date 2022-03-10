import { useSelector } from "react-redux";

import styles from "./BarGraph.module.css";

import { addSplitsInDay } from "../../util.js";

export default function BarGraph({ mode, weekId }) {
  // Store
  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const week = useSelector((state) => state.projects[projectId].weeks[weekId]);

  const deadline = Math.floor(
    new Date(useSelector((state) => state.projects[projectId].deadline)).getTime() / 86400000
  );
  const hourGoal = useSelector((state) => state.projects[projectId].hourGoal);
  const projectTime = useSelector((state) => state.projects[projectId].totalTime);

  // Vars
  const daysLeft = deadline ? deadline - Math.floor(new Date().getTime() / 86400000) - 1 : null;
  const dailyRate = hourGoal && deadline ? (hourGoal - projectTime) / daysLeft : null;

  const graphHeight = mode === "active" ? 120 : 60;

  let mostTime = week.reduce((acc, currentDay) => {
    const dayTime = addSplitsInDay(currentDay);
    return dayTime > acc ? dayTime : acc;
  }, addSplitsInDay(week[0]));
  if (dailyRate && dailyRate > mostTime) mostTime = dailyRate;

  const ovfScaleFactor = graphHeight / mostTime;

  const rateBarHeight = dailyRate ? (dailyRate / mostTime) * 100 : null;

  const fullTimeHue = 126;
  const emptyTimeHue = 1;
  const noTimeColor = "rgb(88, 88, 88)";

  // JSX
  return (
    <div
      className={`${styles.container} ${mode === "active" && styles.active}`}
      style={{
        height: `${graphHeight}px`,
      }}
    >
      {week.map((day, index) => {
        const dayTime = addSplitsInDay(day);
        const barPercent = dayTime / mostTime;

        const interpFlatness = 30;
        let barHue =
          (emptyTimeHue + interpFlatness) *
            Math.pow((fullTimeHue + interpFlatness) / (emptyTimeHue + interpFlatness), dayTime / dailyRate) -
          interpFlatness;
        if (barHue > fullTimeHue) barHue = fullTimeHue;

        return (
          <div className={styles.barContainer} style={{ height: graphHeight }} key={index}>
            {rateBarHeight && (
              <div
                className={styles.rateBar}
                style={{
                  height: `${rateBarHeight}%`,
                  background: `gray`,
                }}
              ></div>
            )}

            <div
              className={styles.timeBar}
              style={{
                height: `${barPercent * 100}%`,
                background:
                  rateBarHeight < barPercent * 100
                    ? `linear-gradient(180deg,
											rgba(36, 219, 54, 1) ${dailyRate * ovfScaleFactor}px,
											rgba(57, 184, 255, 1) ${dailyRate * ovfScaleFactor}px)`
                    : `hsl(${barHue}, 72%, 50%)`,
              }}
            ></div>

            {mode === "active" && (
              <p className={styles.timeBarNumber}>{Math.floor(addSplitsInDay(day) * 100) / 100} hrs</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
