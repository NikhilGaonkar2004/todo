import { useAuth } from '../../context/Auth.context'
import ProtectedRoute from '../../compoents/ProtectedRoute'

const Profile = () => {
  const {user, logoutUser} = useAuth()

  return (
    <ProtectedRoute>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <h1>{user && user.name}</h1>
            <p className="text-muted">Account Information</p>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <p className="fw-bold">{user && user.name}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <p className="fw-bold">{user && user.email}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <button onClick={logoutUser} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile