import { useSelector } from "react-redux";
import Project from "./Project";

export default function ProjectList() {
  const projectIds = useSelector((state) => Object.keys(state.projects));

  return (
    <div>
      {projectIds.map((projectId, index) => (
        <Project key={index} projectId={projectId} />
      ))}
    </div>
  );
}
