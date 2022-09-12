import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../slices/todoSlice';
import TodoItem from './TodoItem';

function AppContent() {

    const todoList = useSelector(state => state.todo.todoList);
    const d = useSelector(state => state.todo)
    const dispatch = useDispatch();
    //dispatch(getTasks())
    useEffect(() => {
        dispatch(getTasks())
        

    }, [d.isInsertSuccess, d.isDeleteSuccess, d.isEditSuccess, d.isInsertLoading])
    const filterStatus = useSelector(state => state.todo.filterStatus);
    console.log({filterStatus})
    const sortedTodoList = [...todoList]
    sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
    console.log(sortedTodoList);

  return (
     d.isGetLoading ? <div style={{fontSize: "2.5rem", textAlign: "center", fontWeight: "700"}} >Loading ...</div> : <div>
        {sortedTodoList && sortedTodoList.length > 0 ? sortedTodoList.filter((item) => filterStatus === 'all' ? true : item.status === filterStatus).map((todo) =>  <TodoItem key={todo.id} todo={todo} />) : 'No Tasks'}
    </div>
  )
}

export default AppContent