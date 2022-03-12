import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSplitTime } from "../../redux/actionCreators/projectsActionCreators.js";

import styles from "./DaySplits.module.css";

import { addSplitsInDay } from "../../util.js";

export default function DaySplits({ weekId, selectedDay }) {
  // Store
  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const day = useSelector((state) => state.projects[projectId].weeks[weekId][selectedDay]);

  // Hooks
  const canvasRef = useRef(null);

  useEffect(() => {
		const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Render split lines
		ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;

		const startStep = canvas.width / 7;
		const startOffset = canvas.width / 15;

		const endStep = canvas.width / day.length;
		const endOffset = canvas.width / (day.length * 2.0745);

		const curveSteepness = 45;

    day.forEach((split, index) => {
			const startX = selectedDay * startStep + startOffset;
			const endX = index * endStep + endOffset;

      ctx.moveTo(startX, 5);
      ctx.bezierCurveTo(startX, 5 + curveSteepness, endX, 115 - curveSteepness, endX, 115);
      ctx.stroke();
    });
  }, [window.innerWidth, selectedDay, day]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.55 - 57);

  // Vars

  // Funcs
  function onResize() {
    setCanvasWidth(window.innerWidth * 0.55 - 57);
  }

  // JSX
  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={`${canvasWidth}px`}
        height="120px"
        style={{ width: `${canvasWidth}px` }}
      />

      {day.map((split, index) => {
        return (
          <div className={styles.splitContainer} key={index}>
            <p className={styles.splitName}>{split.name}</p>

            <input
              type="number"
              value={`${split.time}`}
              name={split.name}
              max={24}
              min={0}
							step={0.5}
              onChange={({ target }) => {
                let time = Math.floor(parseFloat(target.value) * 100) / 100;
                if (isNaN(time) || time >= 24) {
                  time = 0;
                  console.log("Max exeeded");
                }
                dispatch(setSplitTime(projectId, weekId, selectedDay, target.name, time));
              }}
              className={styles.splitTime}
            />
          </div>
        );
      })}
    </div>
  );
}
