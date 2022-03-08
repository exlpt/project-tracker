import { useSelector } from "react-redux";

export default function SplitList() {
  const projectId = useSelector(
    (state) => state.projectEditor.currentProjectId
  );
  const projectSplits = useSelector(
    (state) => state.projects[projectId].projectSplits
  );

  return (
    <ul
      style={{
        height: "200px",
        width: "300px",
        border: "1px solid black",
        overflowY: "scroll",
      }}
    >
      {projectSplits.map((split, index) => {
        const splitColorStyle = { color: split.color };

        return (
          <li style={{ listStyleType: "none" }} key={index}>
            <p style={{ ...splitColorStyle, display: "inline" }}>
              {split.name}
            </p>
            <p style={{ display: "inline" }}>
              • <span style={splitColorStyle}>[split time]</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
