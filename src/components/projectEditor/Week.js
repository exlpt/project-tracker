import { useSelector } from "react-redux";

import styles from "./Week.module.css";

import BarGraph from "./BarGraph.js";
import DaySplits from "./DaySplits.js";

export default function Week({ id }) {
	const selectedWeek = id === useSelector(state => state.projectEditor.selectedWeekId);

	return (
		<div className={styles.container}>
			<BarGraph mode={selectedWeek ? "active" : "inactive"} weekId={id} />
			{selectedWeek && <DaySplits />}
		</div>
	);
}