import React, { useState, useEffect } from 'react';
import Layouts from '../../components/layout/Layouts';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/ContextAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Added password state
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error)
      } else {
       // Update user info in context
        setAuth({...auth, user: data?.updatedUser}); 
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Layouts title={'Dashboard - Your Profile'}>
      <div className="container-fluid px-4 py-3">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-header bg-gradient text-white text-center p-4 rounded-top">
                <h4 className="fs-2 mb-0 text-dark">Your Profile</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label text-muted">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control shadow-sm border-0 rounded-3 py-2"
                      id="name"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-muted">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control shadow-sm border-0 rounded-3 py-2"
                      id="email"
                      placeholder="Enter Your Email"
                      
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-muted">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}  // Set password here
                      className="form-control shadow-sm border-0 rounded-3 py-2"
                      id="password"
                      placeholder="Enter Your Password"
                      
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label text-muted">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control shadow-sm border-0 rounded-3 py-2"
                      id="phone"
                      placeholder="Enter Your Phone"
                      
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="form-label text-muted">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control shadow-sm border-0 rounded-3 py-2"
                      id="address"
                      placeholder="Enter Your Address"
                     
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary btn-lg w-100 w-md-50 rounded-pill shadow">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Profile;
