import { useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./WeekList.module.css";

import Week from "./Week.js";

export default function WeekList() {
	const projectId = useSelector(state => state.projectEditor.currentProjectId);
	const weekIds = Object.keys(useSelector(state => state.projects[projectId].weeks));

	const weeksContainer = useRef(null);

	return (
		<div ref={weeksContainer} className={styles.container}>
			<div className={styles.daysContainer}>
				<h1>S</h1>
				<h1>M</h1>
				<h1>T</h1>
				<h1>W</h1>
				<h1>T</h1>
				<h1>F</h1>
				<h1>S</h1>
			</div>

			{weekIds.map((weekId, index) => <Week id={weekId} container={weeksContainer} key={index} />)}
		</div>
	)
}