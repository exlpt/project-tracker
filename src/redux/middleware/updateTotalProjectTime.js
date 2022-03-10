import { setProjectTotalTime } from "../actionCreators/projectsActionCreators.js";

const updateTotalProjectTime = (store) => (next) => (action) => {
  if (action.type === "PROJECTS_SET_SPLIT_TIME") {
    const projectId = store.getState().projectEditor.currentProjectId;

    if (projectId) {
      const weeks = store.getState().projects[projectId].weeks;
			
			let totalTime = 0;
      for (let week in weeks) {
				weeks[week].forEach((day) => {
					day.forEach((split) => {
						totalTime += split.time;
					});
				})
      }
			
			store.dispatch(setProjectTotalTime(projectId, Math.floor(totalTime * 100) / 100));
    }
  }

  next(action);
};

export default updateTotalProjectTime;
