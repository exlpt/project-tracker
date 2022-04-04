import produce from "immer";

export default function projectEditorReducer(
  state = { currentProjectId: null, selectedWeekId: null },
  action
) {
  switch (action.type) {
    case "SET_PROJECT_ID": {
      return produce(state, (draft) => {
        draft.currentProjectId = action.payload.projectId;
      });
    }

    case "SET_WEEK_ID": {
      return produce(state, (draft) => {
        draft.selectedWeekId = action.payload.weekId;
      });
    }

    default: {
      return produce(state, (draft) => {});
    }
  }
}
