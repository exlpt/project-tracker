import { nanoid } from "nanoid";
import { useState } from "react";

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
          totalTime: 0,

          projectSplits: [],

          weeks: {
            [nanoid()]: [[], [], [], [], [], [], []],
          },
        },
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
        },
      };
    }

    case "PROJECTS_DELETE_PROJECT": {
      const newState = {};

      const projectIds = Object.keys(state);
      for (let projectId of projectIds) {
        if (projectId !== action.payload.projectId) {
          newState[projectId] = { ...state[projectId] };
        }
      }

      return newState;
    }

    case "PROJECTS_ADD_SPLIT": {
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

    case "PROJECTS_ADD_WEEK": {
      const newProject = { ...state[action.payload.projectId] };

      newProject.weeks[nanoid()] = [
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
        JSON.parse(JSON.stringify(action.payload.defaultWeekSplits)),
      ];

      return { ...state, [action.payload.projectId]: newProject };
    }

    case "PROJECTS_SET_SPLIT_TIME": {
      const newState = { ...state };

      newState[action.payload.projectId].weeks[action.payload.weekId][action.payload.dayIndex].forEach(
        (split) => {
          if (split.name !== action.payload.splitName) return;
          split.time = action.payload.time;
        }
      );

      return newState;
    }

    case "PROJECT_SET_TOTAL_TIME": {
      return {
        ...state,
        [action.payload.projectId]: {
          ...state[action.payload.projectId],
          totalTime: action.payload.time,
        },
      };
    }

    default: {
      return { ...state };
    }
  }
}
