import { useState } from "react";
import produce from "immer";
import { nanoid } from "nanoid";

export default function projectsReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_PROJECT": {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

      return produce(state, (draft) => {
        draft[nanoid()] = {
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
        };
      });
    }

    case "EDIT_PROJECT": {
      return produce(state, (draft) => {
        draft[action.payload.projectId] = {
          title: action.payload.title,
          themeColor: action.payload.themeColor,
          bannerImage: action.payload.bannerImage,
          deadline: action.payload.deadline,
          hourGoal: action.payload.hourGoal,
        };
      });
    }

    case "EDIT_DATES": {
      return produce(state, (draft) => {
        draft[action.payload.projectId].startDate =
          action.payload.startDate === null
            ? state[action.payload.projectId].startDate
            : action.payload.startDate;

        draft[action.payload.projectId].dateLastOpened =
          action.payload.dateLastOpened === null
            ? state[action.payload.projectId].dateLastOpened
            : action.payload.dateLastOpened;
      });
    }

    case "DELETE_PROJECT": {
      return produce(state, (draft) => {
        for (let projectId in state) {
          if (projectId === action.payload.projectId) {
            delete draft[projectId];
            break;
          }
        }
      });
    }

    case "ADD_WEEK": {
      const defaultWeekSplits = state[action.payload.projectId].projectSplits.map((split) => ({
        name: split.name,
        time: 0,
      }));

      return produce(state, (draft) => {
        draft[action.payload.projectId].weeks[nanoid()] = [
          [...defaultWeekSplits],
          [...defaultWeekSplits],
          [...defaultWeekSplits],
          [...defaultWeekSplits],
          [...defaultWeekSplits],
          [...defaultWeekSplits],
          [...defaultWeekSplits],
        ];
      });
    }

    case "SET_TOTAL_TIME": {
      return produce(state, (draft) => {
        draft[action.payload.projectId].totalTime = action.payload.time;
      });
    }

    case "ADD_SPLIT": {
      return produce(state, (draft) => {
        draft[action.payload.projectId].projectSplits.push({
          name: action.payload.splitName,
          color: action.payload.splitColor,
        });

        for (let weekId in state[action.payload.projectId].weeks) {
          draft[action.payload.projectId].weeks[weekId] = state[action.payload.projectId].weeks[weekId].map(
            (daySplits) => [...daySplits, { name: action.payload.splitName, time: 0 }]
          );
        }
      });
    }

    case "DELETE_SPLIT": {
      return produce(state, (draft) => {
        draft[action.payload.projectId].projectSplits = state[action.payload.projectId].projectSplits.filter(
          (split) => split.name !== action.payload.splitName
        );

        for (let weekId in state[action.payload.projectId].weeks) {
          state[action.payload.projectId].weeks[weekId].forEach((day, index) => {
            draft[action.payload.projectId].weeks[weekId][index] = day.filter(
              (split) => split.name !== action.payload.splitName
            );
          });
        }
      });
    }

    case "SET_DAY_SPLIT_TIME": {
      return produce(state, (draft) => {
        state[action.payload.projectId].weeks[action.payload.weekId][action.payload.dayIndex].forEach(
          (split, index) => {
            if (split.name !== action.payload.splitName) return;

            draft[action.payload.projectId].weeks[action.payload.weekId][action.payload.dayIndex][
              index
            ].time = action.payload.time;
          }
        );
      });
    }

    default: {
      return produce(state, (draft) => {});
    }
  }
}
