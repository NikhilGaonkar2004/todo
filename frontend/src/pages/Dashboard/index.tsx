import ProtectedRoute from "../../compoents/ProtectedRoute"
import AddTask from "./components/AddTask"
import AllTask from "./components/AllTask"

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="dashboard-container">
                <div className="container py-4 dashboard-content">
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="page-header">
                                <h1 className="mb-3">Task Dashboard</h1>
                                <p className="text-muted">Manage your tasks efficiently</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <AddTask />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <AllTask />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Dashboard