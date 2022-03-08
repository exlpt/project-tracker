export default function AddEditProjectReducer(
  state = { mode: "add", projectId: null },
  action
) {
  switch (action.type) {
    case "ADD_EDIT_PROJECT_SET_MODE": {
      return {
        ...state,
        mode: action.payload.mode,
      };
    }

    case "ADD_EDIT_PROJECT_SET_PROJECT": {
      return {
        ...state,
        projectId: action.payload.projectId,
      };
    }

    default: {
      return { ...state };
    }
  }
}
