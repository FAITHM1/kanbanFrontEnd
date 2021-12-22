import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Headerform from "./pages/HeaderForm";
import Header from "./components/Header";
import SignleMain from "./pages/SingleMain";
import User from "./pages/User";
import Footer from "./components/Footer";
import Home from"./pages/Home"

function App() {
  // Links
  const mainProjectUrl = "https://fmkanbanback.herokuapp.com/projects/";
  const subprojectUrl = "https://fmkanbanback.herokuapp.com/subprojects/";
  const [mainProject, setMainProject] = useState(null);
  const [subProject, setSubProject] = useState(null);
  //main project
  const getMainProject = async () => {
    const response = await fetch(mainProjectUrl);
    const data = await response.json();
    setMainProject(data);
  };
  useEffect(() => getMainProject(), []);

  const createMainProject = async (mainProject) => {
    await fetch(mainProjectUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainProject),
    });
    getMainProject();
  };

  const updateMainProject = async (mainProject, id) => {
    await fetch(mainProjectUrl + id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainProject),
    });
    getMainProject();
  };

  const deleteMainProject = async (id) => {
    await fetch(mainProjectUrl + id + "/", {
      method: "delete",
    });
    getMainProject();
  };
  //sub project
  const getSubProject = async () => {
    const response = await fetch(subprojectUrl);
    const data = await response.json();
    setSubProject(data);
  };

  const createSubProject = async (subProject) => {
    await fetch(subprojectUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subProject),
    });
    getSubProject();
  };

  const updateSubProject = async (subProject, id) => {
    await fetch(subprojectUrl + id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subProject),
    });
    getSubProject();
  };

  const deleteSubProject = async (id) => {
    await fetch(subprojectUrl + id + "/", {
      method: "delete",
    });
    getSubProject();
  };
  useEffect(() => getSubProject(), []);
  const nullProject = {
    title: "",
    type: "",
  };
  return (
    <div className="App">
      <Header mainProject={mainProject} deleteMain={deleteMainProject} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="/add"
          element={
            <Headerform
              handleSubmit={createMainProject}
              initialProject={nullProject}
              btnName="Create Project"
            />
          }
        />
        <Route
          path="/edit"
          element={
            <Headerform handleSubmit={updateMainProject} btnName="Edit" />
          }
        />
        <Route path="/user"
        element={<User/>}/>
        <Route
          path="/projects/:id"
          element={
            <SignleMain
              mainProject={mainProject}
              subProject={subProject}
              add={createSubProject}
              editSub={updateSubProject}
              deleteSub={deleteSubProject}
              deleteMain={deleteMainProject}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
