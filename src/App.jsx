import React, { useEffect, useState } from 'react';
import './App.css';
import { useQueryTasks } from './hooks/useQueryTasks';
import TodoList from './components/TodoList';
import { useMutationAddTask } from './hooks/useMutationAddTask';
import Title from './components/Title';
import { AppContainer } from './AppStyled';
import Auth from './components/Auth';
import Radio from './components/Radio';
import AddTask from './components/AddTask';

function App() {

  const [todos, setTodos] = useState();
  const [inpAdd, setInpAdd] = useState('');
  const [radioAll, setCheckAll] = useState(true);
  const [radioDoned, setCheckDoned] = useState(false);
  const [radioActive, setActive] = useState(false);
  
  const {data, isLoading, refetch} = useQueryTasks();
  const {mutateAsync: addTaskMutateAsync} = useMutationAddTask();
 
 useEffect(() => {
  if (data) {
    if (radioAll) {
      setTodos(data);
    } else if (radioDoned) {
      let copy = data.filter(elem => elem.isdone)
      setTodos(copy);
      refetch();
    } else if (radioActive ){
      let copy = data.filter(elem => !elem.isdone)
      refetch();
      setTodos(copy)
    }
  }
 }, [data, radioAll, radioDoned, radioActive]);
 
 async function addTask () {
  if (inpAdd) {
    try {
      await addTaskMutateAsync({id: new Date().getTime(), task: inpAdd, isdone: false});
    } catch (error) {
      console.log(error);
    }
    refetch();
    setInpAdd('');
  }
 }

 //input for adding a task
 function handleInpAddTaskValue(e) {
  setInpAdd(e.target.value);
 }

 function handleCheckAll() {
  setCheckAll(true);
  setCheckDoned(false);
  setActive(false)

 }

 function handleCheckDoned() {
  setCheckAll(false);
  setCheckDoned(true);
  setActive(false)
 }

 function handlActive() {
  setCheckDoned(false);
  setCheckAll(false);
  setActive(true)
 }

 return (
    <div>
      <AppContainer>

        <Title />

        <AddTask inpAdd={inpAdd}
                handleInpAddTaskValue={handleInpAddTaskValue}
                addTask={addTask} />

        <Radio checkAll={radioAll} 
                handleCheckAll={handleCheckAll}
                checkDoned={radioDoned}
                handleCheckDoned={handleCheckDoned}
                active={radioActive}
                handlActive={handlActive}/>

        {/* <Auth /> */}
        
        {!isLoading ? todos?.map((todo) => (
          <TodoList key={todo.id} id={todo.id} isDone={todo.isdone} task={todo.task} refetch={refetch}/>
        )) : <div>Loading...</div>}

      </AppContainer>
    </div>
 );
}

export default App;
