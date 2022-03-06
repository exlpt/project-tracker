export default function projectEditorReducer(
  state = { currentProjectId: null, selectedWeekId: null },
  action
) {
  switch (action.type) {
		case "PROJECT_EDITOR_SET_PROJECT_ID": {
			return {
				...state,
				currentProjectId: action.payload.projectId
			}
		}

    default: {
      return { ...state };
    }
  }
}
