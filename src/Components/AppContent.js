import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';

function AppContent() {

    const todoList = useSelector(state => state.todo.todoList);
    const filterStatus = useSelector(state => state.todo.filterStatus);
    console.log({filterStatus})
    const sortedTodoList = [...todoList]
    sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
    console.log(sortedTodoList);

  return (
    <div>
        {sortedTodoList && sortedTodoList.length > 0 ? sortedTodoList.filter((item) => filterStatus === 'all' ? true : item.status === filterStatus).map((todo) =>  <TodoItem key={todo.id} todo={todo} />) : 'No Tasks'}
    </div>
  )
}

export default AppContent