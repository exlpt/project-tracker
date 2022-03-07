import { useSelector } from "react-redux";

import Timer from "../components/projectEditor/Timer.js";
import Splits from "../components/projectEditor/Splits.js";
import WeekList from "../components/projectEditor/WeekList.js";

export default function ProjectEditorPage() {
  const projectId = useSelector(
    (state) => state.projectEditor.currentProjectId
  );
  const project = useSelector((state) => state.projects[projectId]);

	const dailyTimeRequired = "implement this once you're able to edit split times";
	const totalTime = "implement this once you're able to edit split times";
		
  return (
    <div>
      <div>
        <h1>
          Start <span>{project.startDate}</span>
        </h1>
        <h1>
          Deadline <span>{project.deadline ? project.deadline : " - - -"}</span>
        </h1>
      </div>
      <h1>{project.title}</h1>

			<Timer />

			<h2>Hour goal -</h2>
			<h3>{project.hourGoal ? project.hourGoal : "- - -"}</h3>
			<h2>Daily time required -</h2>
			<h3></h3>
			<h2>Total time -</h2>
			<h3></h3>

			<Splits />

			<WeekList />
    </div>
  );
}
