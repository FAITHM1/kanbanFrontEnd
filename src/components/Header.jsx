import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ mainProject, deleteMain }) {
  const [scrollDown, setScrollDown] = useState();
  const handleToggle = () => {
    setScrollDown(!scrollDown);
  };

  return (
    <>
      <header>
        <div className="nav">
          <nav>
            <div className="drowDown">
              <p>
                {" "}
                <i
                  onClick={handleToggle}
                  class={`${
                    scrollDown ? "fas fa-chevron-down" : "fas fa-bars"
                  }`}
                ></i>
                <small>projects</small>{" "}
              </p>
            </div>
            <h2>Go Along</h2>
            <Link to="/user">
              <i class="fas fa-user"></i>
            </Link>
          </nav>
        </div>
        <div className={`menu ${scrollDown ? "showMenu" : ""}`}>
          <div className="menuContent">
          <Link to="/add">Create new project</Link>
          {mainProject?.map((project) => {
            return (
              <div key={project.pk}>
                <Link to={`/projects/${project.pk}`}>
                  {project.fields.title}
                </Link>{" "}
                <i
                  onClick={() => deleteMain(project.pk)}
                  class="fas fa-trash-alt"
                ></i>
               
              </div>
            );
          })}
           </div>
        </div>
      </header>
    </>
  );
}

export default Header;
