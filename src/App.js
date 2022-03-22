import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.js";
import ProjectsPage from "./pages/ProjectsPage.js";
import ProjectEditorPage from "./pages/ProjectEditorPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="editor" element={<ProjectEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
