import { ErrorMessage, Field, Form, Formik } from 'formik' 
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAuth } from '../../../context/Auth.context'

const Register = () => {
  const {registerUser} = useAuth()

  type RegisterType = {
    name: string
    email: string
    password: string
  }
  
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
  })

  const initalValues: RegisterType = {
    name: '',
    email: '',
    password: ''
  }

  const onSubmitHandler = async (e: RegisterType, { resetForm }: any) => {
    try {
      const data = await registerUser(e.name, e.email, e.password)
      toast.success((data && data.msg) || "Registration successful")
    } catch (error: any) {
      toast.error(error.message)
    }
    resetForm();
  }
  
  return (
    <div className="auth-page">
      <Formik validationSchema={validationSchema} initialValues={initalValues} onSubmit={onSubmitHandler}>
        {({ isSubmitting }) => (
          <Form className='auth-card'>
            <div className="mb-4 text-center">
              <h1>Register</h1>
              <p className="text-muted">Create your account to get started</p>
            </div>
            
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
              <Field 
                name="name" 
                id="name" 
                type="text" 
                className="form-control" 
                placeholder="John Doe" 
              />
              <ErrorMessage name='name' component={'p'} className='text-sm text-danger' />
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
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className='text-secondary'>Already have an account? <Link to={'/auth/login'}>Login</Link></p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register