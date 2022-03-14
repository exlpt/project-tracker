export default function AddEditProjectReducer(
  state = { mode: "add", projectId: null },
  action
) {
  switch (action.type) {
    case "SET_MODE": {
      return {
        ...state,
        mode: action.payload.mode,
      };
    }

    case "SET_PROJECT": {
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
