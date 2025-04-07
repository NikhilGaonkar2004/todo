import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useTask } from '../../../context/Task.context'
import { useState } from 'react'
import { MdAdd, MdCheck } from 'react-icons/md'

const AddTask = () => {
    const { addTask } = useTask()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    type AddTask = {
        title: string
        desc: string
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
        desc: yup.string().required("Description is Required").min(5, "Description must be at least 5 characters")
    })

    const initalValues: AddTask = {
        desc: '',
        title: ''
    }

    const onSubmitHandler = async (e: AddTask, { resetForm }: any) => {
        try {
            setIsSubmitting(true)
            await addTask(e.title, e.desc)
            
            // Show success animation
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 1500)

            toast.success("Task added successfully!")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
            resetForm();
        }
    }

    return (
        <>
            <Formik validationSchema={validationSchema} initialValues={initalValues} onSubmit={onSubmitHandler} >
                {({ errors, touched }) => (
                    <Form className='col-sm-12 mx-auto add-task-form'>
                        <div className="mb-3">
                            <h1>Add Task</h1>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title <span className="text-danger">*</span>
                            </label>
                            <Field
                                name="title"
                                id="title"
                                type="text"
                                className={`form-control input-field ${errors.title && touched.title ? 'is-invalid' : ''}`}
                                placeholder="Enter task title"
                            />
                            <ErrorMessage name='title' component={'p'} className='text-sm text-danger error-message' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">
                                Description <span className="text-danger">*</span>
                            </label>
                            <Field
                                as="textarea"
                                rows="3"
                                className={`form-control input-field ${errors.desc && touched.desc ? 'is-invalid' : ''}`}
                                name="desc"
                                id="desc"
                                placeholder="Enter task description"
                            />
                            <ErrorMessage name='desc' component={'p'} className='text-sm text-danger error-message' />
                        </div>
                        <div className="mb-3">
                            <button 
                                type="submit" 
                                className="btn btn-dark submit-btn" 
                                disabled={isSubmitting}
                            >
                                {showSuccess ? (
                                    <><MdCheck className="me-2" /> Task Added</>
                                ) : isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> 
                                        Adding...
                                    </>
                                ) : (
                                    <><MdAdd className="me-2" /> Add Task</>
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddTask