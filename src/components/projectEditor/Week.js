import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWeekId } from "../../redux/actionCreators/projectEditorActionCreators.js";

import styles from "./Week.module.css";

import BarGraph from "./BarGraph.js";
import DaySplits from "./DaySplits.js";

export default function Week({ id, container }) {
  const dispatch = useDispatch();
  const selectedWeek = id === useSelector((state) => state.projectEditor.selectedWeekId);

  // Calculate week start and end dates
  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const startDate = new Date(useSelector((state) => state.projects[projectId].startDate));
  const weekIds = Object.keys(useSelector((state) => state.projects[projectId].weeks));
  const dayOffset = (weekIds.length - weekIds.indexOf(id) - 1) * 7 - startDate.getDay();
  const weekStartDate = new Date(startDate.getTime() + dayOffset * 86400000);
  const weekEndDate = new Date(weekStartDate.getTime() + 518400000);

  const [selectedDay, setSelectedDay] = useState(0);
  const weekContainer = useRef(null);
  const [weekPos, setWeekPos] = useState(null);

  // Calculate position in parent container
  useEffect(() => {
    setWeekPos(
      weekContainer.current.getBoundingClientRect().top - container.current.getBoundingClientRect().top - 200
    );
  }, []);

  function selectThisWeek() {
    dispatch(setWeekId(id));

    // Auto scroll
    container.current.scrollTo({ top: weekPos, left: 0, behavior: "smooth" });
  }

  return (
    <div onClick={selectThisWeek} ref={weekContainer} className={styles.container}>
      <p className={styles.startDate}>{weekStartDate.toString().slice(4, 10)}</p>
      <p className={styles.endDate}>{weekEndDate.toString().slice(4, 10)}</p>
      <BarGraph
        mode={selectedWeek && weekPos ? "active" : "inactive"}
        weekId={id}
        setSelectedDay={setSelectedDay}
      />
      {selectedWeek && weekPos && (
        <DaySplits weekId={id} selectedDay={selectedDay} weekListRef={container} />
      )}
    </div>
  );
}
