import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Week.module.css";

import BarGraph from "./BarGraph.js";
import DaySplits from "./DaySplits.js";

export default function Week({ id }) {
  const selectedWeek = id === useSelector((state) => state.projectEditor.selectedWeekId);

  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className={styles.container}>
      <BarGraph mode={selectedWeek ? "active" : "inactive"} weekId={id} setSelectedDay={setSelectedDay} />
      {selectedWeek && <DaySplits weekId={id} selectedDay={selectedDay} />}
    </div>
  );
}
