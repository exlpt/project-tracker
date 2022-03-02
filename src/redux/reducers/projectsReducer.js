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
					startDate: `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`,
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

    default: {
      return { ...state };
    }
  }
}
