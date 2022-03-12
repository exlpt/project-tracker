import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWeekId } from "../../redux/actionCreators/projectEditorActionCreators.js";

import styles from "./Week.module.css";

import BarGraph from "./BarGraph.js";
import DaySplits from "./DaySplits.js";

export default function Week({ id, container }) {
  const dispatch = useDispatch();
  const selectedWeek = id === useSelector((state) => state.projectEditor.selectedWeekId);

  const [selectedDay, setSelectedDay] = useState(0);
  const weekContainer = useRef(null);
  let weekPos = useRef(null);

  useEffect(() => {
    weekPos.current =
      weekContainer.current.getBoundingClientRect().top -
      (selectedWeek ? 100 : 340) -
      container.current.getBoundingClientRect().top;
  }, []);

  function selectThisWeek() {
    dispatch(setWeekId(id));

    // Auto scroll
    container.current.scrollTo({ top: weekPos.current, left: 0, behavior: "smooth" });
  }

  return (
    <div onClick={selectThisWeek} ref={weekContainer} className={styles.container}>
      <BarGraph mode={selectedWeek ? "active" : "inactive"} weekId={id} setSelectedDay={setSelectedDay} />
      {selectedWeek && <DaySplits weekId={id} selectedDay={selectedDay} weekListRef={container} />}
    </div>
  );
}
