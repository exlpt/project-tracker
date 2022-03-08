import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export default function Timer() {
  const projectId = useSelector(
    (state) => state.projectEditor.currentProjectId
  );
  const deadline = useSelector((state) =>
    Math.floor(new Date(state.projects[projectId].deadline).getTime() / 1000)
  );

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    Math.floor(today.getTime() / 1000) - 1
  );

  useEffect(() => {
    setTimeout(() => {
      setCurrentDate(Math.floor(today.getTime() / 1000));
    }, 1000);
  });

  const diffSeconds = deadline - currentDate;
  const diffDays = Math.floor(diffSeconds / 86400);
  const diffHours = Math.floor(diffSeconds / 3600);
  const diffMinutes = Math.floor(diffSeconds / 60);

  return (
    <div>
      <h1>
        {diffSeconds < 0
          ? "0 : 0 : 0 : 0"
          : `
					${deadline ? diffDays : "-"} : 
					${deadline ? diffHours % 24 : "-"} : 
					${deadline ? diffMinutes % 60 : "-"} : 
					${deadline ? diffSeconds % 60 : "-"}
				`}
      </h1>
    </div>
  );
}
