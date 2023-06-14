
import React, { useState } from "react";
import { CiLineHeight } from 'react-icons/ci'
import { FiAlertCircle, FiEdit } from "react-icons/fi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { myArray, di } from './data.js';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";




function App() {



  const [datas, setUser] = useState(myArray)
  const [info] = useState(di)
  const [isOn, setIsOn] = useState(false);
  const [updateState, setUpdate] = useState(-1)

  const handleToggle = () => {
    setIsOn(!isOn);

  };

  function handleEdit(id) {
    setUpdate(id)
  }


  const handleDragEnd = (results) => {
    if (!results.destination) return
    let tempUser = [...datas]
    let [SelectRow] = tempUser.splice(results.source.index, 1)
    tempUser.splice(results.destination.index, 0, SelectRow)
    setUser(tempUser)
  };

  function handleback() {
    window.location.reload();

  }
  function Edit({ data }) {

    return (
      <li className="flex justify-end  ">
        <div className="w-full">
          <input className="mr-12 bg-gray-500 w-[35%] p-2 text-white " type="text" value={data.content} />
        </div>

        <button className="bg-purple-800 mr-10 w-[20%] font-semibold rounded-2xl text-white" onClick={() => handleback()}>Save</button>
      </li>
    )

  }










  return (
    <div className="h-full w-full p-4 bg-gray-400">

      <h1 className="text-3xl font-medium capitalize pt-2 text-center text-white ">
        Select your section
      </h1>

      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <div className="flex flex-col justify-center  mt-3 bg-slate-100  w-full m-auto , rounded-md shadow-xl p-4 ">

          <Droppable droppableId="tbody">
            {
              (provided) => (

                <ul ref={provided.innerRef}{...provided.droppableProps} className="w-full">

                  {datas.map((data, index) => (
                    updateState === data.id ? <Edit data={data} /> :
                      <Draggable draggableId={data.content} index={index} key={data.content}>
                        {
                          (provided) => (

                            <li ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="text-black capitalize flex justify-between bg-slate-200 p-2 my-2">
                              <div className="flex w-full">
                                <div  {...provided.dragHandleProps}>
                                  <CiLineHeight size={20} className="mr-2" />
                                </div>




                                {/* info */}
                                <div className="mb-1">

                                  <Tippy content={index === 0 ? info[0] : index === 1 ? info[1] : index === 2 ? info[2] : index === 3 ? info[3] : index === 4 ? info[4] : index === 5 ? info[5] : index === 6 ? info[6] : index === 7 ? info[7] : info[8]}>
                                    <button>
                                      <FiAlertCircle id="myButton" size={14} className="mr-1 mt-1" />
                                    </button>
                                  </Tippy>

                                </div>



                                {/* Data  */}


                                <p className={isOn ? (index ? "font-bold capitalize ml-2" : "ml-2 cursor-pointer line-through") : "font-bold capitalize ml-2"}>{data.content}</p>

                              </div>

                              {/* edit buttion */}

                              <div className="flex justify-end">
                                <FiEdit onClick={() => handleEdit(data.id)} className="ml-1 mt-1" />
                              </div>


                              {/* radio button */}

                              <div className="ml-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input onChange={handleToggle} type="checkbox" value="" className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                              </div>

                            </li>



                          )
                        }

                      </Draggable>

                  ))}

                  {provided.placeholder}

                </ul>




              )
            }




          </Droppable>

          <div className="flex  justify-center mt-2 ">
            <button className="bg-purple-600  sm:w-[35%] p-4 text-white font-semibold rounded-2xl">Save and Next</button>
          </div>

        </div>

      </DragDropContext>




    </div>

  );
}

export default App;
