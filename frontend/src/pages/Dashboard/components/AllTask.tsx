import React from 'react'
import { MdOutlineDone } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { Task, useTask } from '../../../context/Task.context';

const AllTask = () => {
    const { tasks, loading, error, deleteTaskById, editTaskById } = useTask()

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h2>Loading tasks...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-danger">
                <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                <h2>Error: {error}</h2>
            </div>
        )
    }

    return (
        <>
            <div className="mb-3">
                <h1>All Tasks ({tasks?.length || 0})</h1>
            </div>
            <div className="flex-wrap d-flex justify-content-center align-items-center">
                {tasks && tasks.length > 0 ? tasks.map((cur: Task, i) => {
                    return (
                        <div 
                            key={i} 
                            className={`card border py-4 px-4 mx-2 my-2 col-sm-12 col-md-6 col-lg-3 task-card ${cur.isComplete ? 'completed' : ''}`}
                        >
                            {cur.isComplete && <span className="completed-badge">Completed</span>}
                            <h1 className={`card-heading ${cur.isComplete ? 'text-decoration-line-through' : ''} `}>{cur.title}</h1>
                            <p className="card-body">{cur.description}</p>
                            <div className="d-flex">
                                <button onClick={() => deleteTaskById(cur._id)} title='delete' className='btn btn-outline-danger rounded-pill delete-btn'>
                                    <RxCross2 />
                                </button>
                                {!cur.isComplete && <button onClick={() => editTaskById(cur._id)} title='isComplete' className='btn btn-outline-primary rounded-pill complete-btn'>
                                    <MdOutlineDone />
                                </button>}
                            </div>
                        </div>
                    );
                }) :
                    <>
                        <div className="text-center empty-state">
                            <i className="bi bi-inbox fs-1"></i>
                            <h1 className="text-decoration-underline">No Tasks Available</h1>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default AllTask