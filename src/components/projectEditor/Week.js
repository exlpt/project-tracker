import { useSelector } from "react-redux";

import styles from "./Week.module.css";

import BarGraph from "./BarGraph.js";
import DaySplits from "./DaySplits.js";

export default function Week({ id }) {
	const selectedWeek = id === useSelector(state => state.projectEditor.selectedWeekId);

	return (
		<div>
			<BarGraph mode={selectedWeek ? "active" : "inactive"} />
			{selectedWeek && <DaySplits />}
		</div>
	);
}