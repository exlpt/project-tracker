import { nanoid } from "nanoid";
import { useState } from "react";

export default function projectsReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_PROJECT": {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

      return {
        ...state,
        [nanoid()]: {
          title: action.payload.title,
          themeColor: action.payload.themeColor,
          bannerImage: action.payload.bannerImage,
          startDate,
          deadline: action.payload.deadline,
          hourGoal: action.payload.hourGoal,
          totalTime: 0,
          dateLastOpened: startDate,

          projectSplits: [],

          weeks: {
            [nanoid()]: [[], [], [], [], [], [], []],
          },
        },
      };
    }

    case "EDIT_PROJECT": {
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          title: action.payload.title,
          themeColor: action.payload.themeColor,
          bannerImage: action.payload.bannerImage,
          deadline: action.payload.deadline,
          hourGoal: action.payload.hourGoal,
        },
      };
    }

    case "EDIT_DATES": {
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],

          startDate:
            action.payload.startDate === null
              ? state[action.payload.projectId].startDate
              : action.payload.startDate,

          dateLastOpened:
            action.payload.dateLastOpened === null
              ? state[action.payload.projectId].dateLastOpened
              : action.payload.dateLastOpened,
        },
      };
    }

    case "DELETE_PROJECT": {
      const newState = {};

      const projectIds = Object.keys(state);
      for (let projectId of projectIds) {
        if (projectId !== action.payload.projectId) {
          newState[projectId] = { ...state[projectId] };
        }
      }

      return newState;
    }

    case "ADD_WEEK": {
      const newWeek = [
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
      ];

      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          weeks: {
						[nanoid()]: newWeek,
            ...state[action.payload.projectId].weeks,
          },
        },
      };
    }

    case "SET_TOTAL_TIME": {
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          totalTime: action.payload.time,
        },
      };
    }

    case "ADD_SPLIT": {
      const newState = JSON.parse(JSON.stringify(state));

      newState[action.payload.projectId].projectSplits.push({
        name: action.payload.splitName,
        color: action.payload.splitColor,
      });

      for (let weekId in newState[action.payload.projectId].weeks) {
        newState[action.payload.projectId].weeks[weekId] = newState[action.payload.projectId].weeks[
          weekId
        ].map((daySplits) => [...daySplits, { name: action.payload.splitName, time: 0 }]);
      }

      return newState;
    }

    case "DELETE_SPLIT": {
      const newState = JSON.parse(JSON.stringify(state));

      newState[action.payload.projectId].projectSplits = newState[
        action.payload.projectId
      ].projectSplits.filter((split) => split.name !== action.payload.splitName);

      for (let weekId in newState[action.payload.projectId].weeks) {
        newState[action.payload.projectId].weeks[weekId].forEach((day, index) => {
          newState[action.payload.projectId].weeks[weekId][index] = day.filter(
            (split) => split.name !== action.payload.splitName
          );
        });
      }

      return newState;
    }

    case "SET_DAY_SPLIT_TIME": {
      const newState = { ...state };

      newState[action.payload.projectId].weeks[action.payload.weekId][action.payload.dayIndex].forEach(
        (split) => {
          if (split.name !== action.payload.splitName) return;
          split.time = action.payload.time;
        }
      );

      return newState;
    }

    default: {
      return { ...state };
    }
  }
}
