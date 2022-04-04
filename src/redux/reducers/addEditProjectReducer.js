import produce from "immer";

export default function AddEditProjectReducer(state = { mode: "add", projectId: null }, action) {
  switch (action.type) {
    case "SET_MODE": {
      return produce(state, (draft) => {
        draft.mode = action.payload.mode;
      });
    }

    case "SET_PROJECT": {
      return produce(state, (draft) => {
        draft.projectId = action.payload.projectId;
      });
    }

    default: {
      return produce(state, (draft) => {});
    }
  }
}
