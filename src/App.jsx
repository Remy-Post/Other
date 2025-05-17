import SideBar from "./Components/SideBar";
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import SelectedProject from "./Components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text) {
    setProjectsState(prev => {
      const newTask = {
        id: Math.random(),
        projectId: prev.selectedProjectId,
        text: text,
      }

      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prev => {
      return {
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id),
      }
    })
  }
  function handleStartAddProject(projectId) {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: id,
      }
    })
  }

  function handleDeleteProject(id) {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(project => project.id !== prev.selectedProjectId),
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);


  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancelAddProject} />
  }
  else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  else if (selectedProject) {
    content = <SelectedProject project={selectedProject} onDeleteProject={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar selectedProjectId={projectsState.selectedProjectId} onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
