import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAuth } from '../../../context/Auth.context'

const Login = () => {
  const {loginUser} = useAuth()
  const navigate = useNavigate()

  type LoginType = {
    email: string
    password: string
  }
  
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().required("Password is required")
  })

  const initalValues: LoginType = {
    email: '',
    password: ''
  }

  const onSubmitHandler = async (e: LoginType, { resetForm }: any) => {
    try {
      const data = await loginUser(e.email, e.password)
      localStorage.setItem("token", data.token)
      toast.success((data && data.msg) || "Login Successful")
      navigate("/")
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  
  return (
    <div className="auth-page">
      <Formik validationSchema={validationSchema} initialValues={initalValues} onSubmit={onSubmitHandler}>
        {({ isSubmitting }) => (
          <Form className='auth-card'>
            <div className="mb-4 text-center">
              <h1>Login</h1>
              <p className="text-muted">Welcome back! Please login to your account.</p>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
              <Field 
                name="email" 
                id="email" 
                type="email" 
                className="form-control" 
                placeholder="john@example.com" 
              />
              <ErrorMessage name='email' component={'p'} className='text-sm text-danger' />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
              <Field 
                name="password" 
                id="password" 
                type="password" 
                className="form-control" 
                placeholder="••••••••" 
              />
              <ErrorMessage name='password' component={'p'} className='text-sm text-danger' />
            </div>
            
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className='text-secondary'>Don't have an account? <Link to={'/auth/register'}>Register</Link></p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login