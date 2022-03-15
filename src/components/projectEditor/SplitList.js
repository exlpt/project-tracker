import { useSelector, useDispatch } from "react-redux";

import { deleteSplit } from "../../redux/actionCreators/projectsActionCreators.js";

import styles from "./SplitList.module.css";

import deleteSymbol from "../../assets/images/delete.svg";

export default function SplitList() {
  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.projectEditor.currentProjectId);
  const projectSplits = useSelector((state) => state.projects[projectId].projectSplits);
  const project = useSelector((state) => state.projects[projectId]);

  function deleteSplitHandler({ target: { name } }) {
    dispatch(deleteSplit(projectId, name));
  }

  function addAllDaySplits(splitName) {
    let total = 0;

    for (let weekId in project.weeks) {
      project.weeks[weekId].forEach((day) => {
        day.forEach((split) => {
          if (split.name === splitName) {
            total += split.time;
          }
        });
      });
    }

    return Math.round(total * 100) / 100;
  }

  return (
    <div
      style={{
        height: "200px",
        width: "300px",
        border: "1px solid black",
        overflowY: "scroll",
      }}
    >
      <table>
        <tbody>
          {projectSplits.map((split, index) => {
            return (
              <tr key={index}>
                <td className={styles.splitName} style={{ color: split.color }}>
                  {split.name}
                </td>

                <td>
                  •{" "}
                  <span className={styles.splitTime} style={{ color: split.color }}>
                    {addAllDaySplits(split.name)}
                  </span>
                </td>

                <td>
                  <button name={split.name} onClick={deleteSplitHandler} className={styles.deleteButton}>
                    <img name={split.name} src={deleteSymbol} className={styles.deleteIcon} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
