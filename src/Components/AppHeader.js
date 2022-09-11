import React, {useState} from 'react'
import TodoModal from './TodoModal'
import { useDispatch } from 'react-redux'
import { updateFilterStatus } from '../slices/todoSlice';

function AppHeader() {

    const dispatch = useDispatch();

    const handleStatusChange = (status) => {
        console.log(status)
        dispatch(updateFilterStatus(status))
    }
    const [ modalOpen, setModalOpen ] = useState(false)

  return (
    <div className='button-container'>
          <button onClick={() => setModalOpen(true)} className="button">Add Task</button>
          <select
              id='status'
              className='button-select'
              onChange={(e) => handleStatusChange(e.target.value)}
          >
              <option value="all">All</option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Completed</option>
          </select>
          <TodoModal type = 'Add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader