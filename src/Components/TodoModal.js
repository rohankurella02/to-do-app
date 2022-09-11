import React, { useEffect, useState } from 'react'
import '../../src/index.css'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addTodo, editTodo } from '../slices/todoSlice'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast';

function TodoModal({ type, modalOpen, setModalOpen, todo }) {

    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('incomplete')

    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'Edit') {
            setTitle(todo.title)
            setStatus(todo.status)
        }
    }, [modalOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.error('Please Enter a Task')
        }
        console.log({ title, status })
        if (title && status) {
            if (type === 'Add') {
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString()
                }))
                toast.success('Task Added Successfully')
                setModalOpen(false)
            }
            if (type === 'Edit') {
                // console.log('edit')
                dispatch(editTodo({
                    ...todo,
                    title,
                    status
                }))
                toast.success('Task Edited Successfully')
            }

        }
    }

    return (
        modalOpen && <div className='wrapper'>
            <div className="modal">
                <div className="close-button" onClick={() => setModalOpen(false)} >
                    <MdOutlineClose></MdOutlineClose>
                </div>
                <form className='form' onSubmit={(e) => handleSubmit(e)} >
                    <h1 className='formTitle'>{type} Task</h1>
                    <label htmlFor="title">
                        Title
                        <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label htmlFor="status">
                        Status
                        <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                    </label>
                    <div className='button-modal'>
                        <button className='button' type='submit'>{type} Task</button>
                        <button onClick={() => setModalOpen(false)} className='button-2' type='button'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TodoModal