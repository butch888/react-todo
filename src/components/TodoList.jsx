import React, { useState } from "react";
import { useMutationDoneTask } from "../hooks/useMutationDoneTask";
import { useMutationDelTask } from "../hooks/useMutationDelTask";
import { useMutationEditTask } from "../hooks/useMutationEditTask";

const TodoList = (props) => {
  const { id, task, isDone, refetch } = props;

  const [editIdTask, setEditIdTask] = useState(null);
  const [inpEdit, setInpEdit] = useState('');
  const [done, setDone] = useState(isDone);

  const { mutateAsync: doneTaskMutateAsync } = useMutationDoneTask();
  const { mutateAsync: delTaskMutateAsync} = useMutationDelTask();
  const { mutateAsync: editTaskMutateAsync } = useMutationEditTask();

  function handleInpEditTaskValue(e) {
    setInpEdit(e.target.value);
   }
  
   function handleEditTask(id, task) {
    setEditIdTask(id);
    setInpEdit(task);
   }
   
   async function isDoneTask (checkd) {
    try {
      await doneTaskMutateAsync({id: id, isdone: checkd})
      setDone(checkd);
    } catch (error) {
      console.log(error)
    }
   }

   async function delTask(id) {
    try {
      await delTaskMutateAsync({id: id});
    } catch (error) {
      console.log(error)
    }
    refetch();
   }

   async function saveEditTask(id) {
    try {
      await editTaskMutateAsync({id: id, task: inpEdit})
    } catch (error) {
      console.log(error)
    }
    refetch();
    setEditIdTask(null);
   }

  return (
    <div>
            <div style={{display: 'grid', gridTemplateColumns: '7% 63% 30%', alignItems: 'center', padding: '5px', maxWidth: '300px', margin: '0 auto', textAlign: 'left'}}>

              <div>
              <input type='checkbox' checked={done} onChange={(e) => isDoneTask(e.target.checked)}/>
              </div>

              {editIdTask === id ? 
                <div>
                  <input type='text' value={inpEdit} autoFocus={true} onChange={handleInpEditTaskValue}/>
                </div> : 
                <div style={{padding: "0 10px"}}>
                  <span className={done ? 'active' : ''}>{task}</span>
                </div>
              }
              
             <div>
             {editIdTask === id ? 
              <button onClick={() => saveEditTask(id)}>Save</button> : 
              <button disabled={done ? true : false} onClick={() => handleEditTask(id, task)}>Edit</button>
             }
              
              <button disabled={editIdTask ? true : false} onClick={() => delTask(id)}>Del</button>
             </div>

            </div>
    </div>
  )
}

export default TodoList;