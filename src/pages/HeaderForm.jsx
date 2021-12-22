import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Headerform({ handleSubmit, initialProject, btnName }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialProject);

  const handleChange = (event) => {
    const newState = { ...formData };
    newState[event.target.name] = event.target.value;
    setFormData(newState);
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    navigate(`/projects`);
  };

  return (
    <form onSubmit={handleSubmission} className="mainForm">
      <lable htmlFor="add project">
        <span>Create new project</span>
        <br/>
        <input
          type="text"
          onChange={handleChange}
          value={formData.title}
          name="title"
        />
      </lable>
      <lable htmlFor="type of project">
        Project type
       
        <select name="type" onChange={handleChange} value={formData.type}>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
          <option value="School">sCHOOL</option>
        </select>
      </lable>
      <input type="submit" value={btnName} />
    </form>
  );
}

export default Headerform;
