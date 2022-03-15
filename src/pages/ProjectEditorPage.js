import { useSelector } from "react-redux";

import Timer from "../components/projectEditor/Timer.js";
import Splits from "../components/projectEditor/Splits.js";
import WeekList from "../components/projectEditor/WeekList.js";

export default function ProjectEditorPage() {
  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const project = useSelector((state) => state.projects[projectId]);

  const deadline = Math.floor(
    new Date(useSelector((state) => state.projects[projectId].deadline)).getTime() / 86400000
  );
  const daysLeft = deadline ? deadline - Math.floor(new Date().getTime() / 86400000) - 1 : null;
  const hourGoal = project.hourGoal;
  const totalTime = project.totalTime;
  const dailyTimeRequired =
    Math.round((hourGoal && deadline ? (hourGoal - totalTime) / daysLeft : null) * 100) / 100;

	const splitStartDate = project.startDate.split("-");
  const splitDeadline = deadline && project.deadline.split("-");

  return (
    <div>
      <div>
        <h1>
          Start <span>{`${splitStartDate[1]}-${splitStartDate[2]}-${splitStartDate[0]}`}</span>
        </h1>
        <h1>
          Deadline <span>
            {project.deadline ? `${splitDeadline[1]}-${splitDeadline[2]}-${splitDeadline[0]}` : " - - -"}
          </span>
        </h1>
      </div>
      <h1>{project.title}</h1>

      <Timer />

      <h2>Hour goal -</h2>
      <h3>{project.hourGoal ? project.hourGoal : "- - -"}</h3>
      {dailyTimeRequired && (
        <div>
          <h2>Daily time required -</h2>
          <h3>{dailyTimeRequired} hrs</h3>
        </div>
      )}
      <h2>Total time -</h2>
      <h3>{totalTime} hrs</h3>

      <Splits />

      <WeekList />
    </div>
  );
}
