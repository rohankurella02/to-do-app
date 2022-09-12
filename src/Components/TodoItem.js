import React, {useEffect, useState} from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, deleteTodo, editTodo, getTasks, updateTask } from '../slices/todoSlice';
import toast from 'react-hot-toast';
import TodoModal from './TodoModal';

function TodoItem({ todo }) {

    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [ checked, setChecked ] = useState(false)

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true)
        }
        else {
            setChecked(false)
        }
    }, [todo.status])

    const handleDelete = () => {
        console.log("delete")
        dispatch(deleteTask(todo.id))
        toast.success('Task Deleted Successfully')

    }

    const handleEdit = () => {
        console.log("edit")
        setModalOpen(true)
    }

    const handleChecked = () => {
        console.log(checked)
        setChecked(!checked)
        dispatch(updateTask(
            {...todo,
            status: checked ? 'incomplete' : 'complete'}
        ))
        setTimeout(() => {
            dispatch(getTasks())
        }, 1000);
    }

  return (
    <>
    <div className='item'>
        <div className="details">
            <input type="checkbox" checked={checked} onChange={handleChecked}  />
              <div className={todo.status === 'complete' ? "todoText-completed" : "todoText" }>
                <p>{todo.title}</p>
                <p className='time'>{todo.time}</p>
            </div>
        </div>
        <div className="todoActions"  >
              <div className="icon" onClick={handleDelete} >
                <MdDelete></MdDelete>
            </div>
              <div className="icon" onClick={handleEdit}>
                  <MdEdit></MdEdit>
              </div>
        </div>
    </div>
    <TodoModal type='Edit' modalOpen={modalOpen} setModalOpen={setModalOpen} todo={todo} />
      </>
  )
}

export default TodoItem