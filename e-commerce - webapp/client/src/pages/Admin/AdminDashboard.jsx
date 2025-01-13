import React from 'react'
import Layouts from '../../components/layout/Layouts'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/ContextAuth'
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layouts>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default AdminDashboard