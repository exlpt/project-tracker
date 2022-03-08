import { nanoid } from "nanoid";

export default function projectsReducer(state = {}, action) {
  switch (action.type) {
		case "PROJECTS_ADD_PROJECT": {
			const today = new Date();

			return {
				...state,
				[nanoid()]: {
					title: action.payload.title,
					themeColor: action.payload.themeColor,
					bannerImage: action.payload.bannerImage,
					startDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
					deadline: action.payload.deadline,
					hourGoal: action.payload.hourGoal,

					projectSplits: [],

					weeks: {
						[nanoid()]: {
							sunday: [
							],
							monday: [
							],
							tuesday: [
							],
							wednesday: [
							],
							thursday: [
							],
							friday: [
							],
							saturday: [
							],
						}
					}
				}
			};
		}

		case "PROJECTS_EDIT_PROJECT": {
			return {
				...state,
				[action.payload.projectId]: {
					...state[action.payload.projectId],
					title: action.payload.title,
					themeColor: action.payload.themeColor,
					bannerImage: action.payload.bannerImage,
					deadline: action.payload.deadline,
					hourGoal: action.payload.hourGoal,
				}
			};
		}

		case "PROJECTS_DELETE_PROJECT": {
			const newState = {};

			const projectIds = Object.keys(state);
			for (let projectId of projectIds) {
				if (projectId !== action.payload.projectId) {
					newState[projectId] = { ...state[projectId] }
				}
			}
			
			return newState;
		}

    default: {
      return { ...state };
    }
  }
}
