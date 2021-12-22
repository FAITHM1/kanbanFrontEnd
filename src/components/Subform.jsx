import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Subform({ initialProject, handleSubmit, btnNam, pkNum }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialProject);
  const [toggle, setToggle] = useState();

  const handleToggle = () => {
    setToggle(!toggle);
  };
  // setFormData.mainProjectNum(pkNum)
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData,initialProject.pk);
    console.log(formData?.pk);
    setFormData(initialProject);
  };
  return (
    <>
      <div className={btnNam}>
        {btnNam}
        <i onClick={handleToggle} class="fas fa-pen"></i>
      </div>
      <form
        onSubmit={handleSubmission}
        className={`form ${toggle ? "showForm" : ""}`}
      >
        <label htmlFor="name">
          Add Todo:
          <input
            type="text"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
        </label>
        <label htmlFor="workingOn">
          who's working on it?
          <input
            type="text"
            onChange={handleChange}
            value={formData.workingOn}
            name="workingOn"
          />
        </label>
        <label htmlFor="description">
          Additional information
          <input
            type="text"
            onChange={handleChange}
            value={formData.description}
            name="description"
          />
        </label>
        <label htmlFor="mainProjectNum">
          <input
            className="mainProjectNum"
            type="text"
            onChange={handleChange}
            value={formData.mainProjectnum}
            name="mainProjectNum"
            readonly
          />
        </label>
        <input type="submit" value={btnNam} />
      </form>
    </>
  );
}

export default Subform;
