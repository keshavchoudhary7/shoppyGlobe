import React from 'react'
import Layouts from '../../components/layout/Layouts'
import UserMenu from '../../components/layout/UserMenu'

const Orders = () => {
  return (
    <Layouts title={'Dashboard - Your Orders'}>
        <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default Orders