import Subform from "../components/Subform";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function SignleMain({ add, mainProject, subProject, editSub, deleteSub }) {
  const finalSpaceList = [];
  const [list, updateList] = useState(finalSpaceList);
  const params = useParams();
  const id = parseInt(params.id);
  // console.log(id);
  const mainProj = mainProject?.find((m) => m.pk === id);
  const subProj = subProject?.filter(
    (sp) => parseInt(sp.fields.mainProjectnum) === id
  );
  // console.log(subProject)
  // console.log(subProj);
  // console.log(mainProj);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removes] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removes);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };
  const id3List = {
    droppableId: "listDO",
    draggableId2: "listDoing",
    droppableId3: "listDone",
  };
  
  function handleOnDragEnd(result) {
    // const {sourse,destination}=result
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateList(items);
  }
  const initalProject = {
    name: "",
    description: "",
    workingOn: "",
    mainProjectnum: id,
  };
  const [view, setView] = useState();
  const handleViewToggle = () => {
    setView(!view);
  };

  return (
    <>
      <section className="addSubForm">
        <h2>{mainProj?.fields.title}</h2>
        <Subform
          initialProject={initalProject}
          handleSubmit={add}
          btnNam="add"
          pkNum={id}
        />
      </section>
      <section>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="cardContainer">
            <div className="cards">
              <h4>TO DO</h4>
              <Droppable droppableId="listDo">
                {(provided) => (
                  <ul
                    className="todo list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {
                      (list,
                      subProj?.map((subp, index) => {
                        const initalSubProject = {
                          name: subp.fields.name,
                          description: subp.fields.description,
                          workingOn: subp.fields.workingOn,
                          mainProjectnum: subp.fields.mainProjectnum,
                          pk: subp.pk
                        };
                        return (
                          <Draggable
                            key={index}
                            draggableId={subp.fields.name}
                            index={subp.pk}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="liDiv">
                                  <h4 onClick={handleViewToggle}> {subp.fields.name}</h4>
                                  <p>
                                    <small>{subp.fields.workingOn}</small>
                                    <br />
                                    <span
                                      
                                      className={`viewMore ${view ? "showMore" : ""}`}
                                    >
                                      {subp.fields.description}
                                    </span>
                                  </p>

                                  <i
                                    onClick={() => deleteSub(subp.pk)}
                                    class="fas fa-trash-alt"
                                  ></i>

                                  <div className="editSection">
                                    <Subform
                                      initialProject={initalSubProject}
                                      handleSubmit={editSub}
                                      btnNam="Edit"
                                      pkNum={id}
                                    />
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      }))
                    }
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
            <div className="cards">
              <h4>DOING</h4>
              <Droppable droppableId="listDoing">
                {(provided) => (
                  <ul
                    className="doing list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
            <div className="cards">
              <h4>DONE</h4>
              <Droppable droppableId="listDone">
                {(provided) => (
                  <ul
                    className="done list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </section>
    </>
  );
}

export default SignleMain;
