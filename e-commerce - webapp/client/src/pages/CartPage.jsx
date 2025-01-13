import React, { useState } from 'react';
import Layouts from '../components/layout/Layouts';
import { useCart } from '../context/cart';
import { useAuth } from '../context/ContextAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemoveItem = (productId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === productId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
      toast.success('Product removed from cart successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedToCheckout = () => {
    if (!auth?.user?.address) {
      toast.error('Please add an address to proceed with the checkout.');
      navigate('/profile');
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConfirmAddress = () => {
    setShowConfirmation(false);
    navigate('/checkout');
  };

  const handleCancelAddress = () => {
    setShowConfirmation(false);
  };

  // Check for user authentication and role
  if (!auth?.token) {
    return (
      <Layouts>
        <div className="container my-4">
          <div className="text-center mb-4">
            <h1 className="display-5">You are not logged in.</h1>
            <p className="text-muted">
              Please <button className="btn btn-link" onClick={() => navigate('/login')}>log in</button> to view your cart.
            </p>
          </div>
        </div>
      </Layouts>
    );
  }

  // Check for admin role and redirect if needed
  if (auth?.user?.role === 'admin') {
    navigate('/');
    return null;  // Or show a different message for admins
  }

  return (
    <Layouts>
      <div className="container my-4">
        <div className="text-center mb-4">
          <h1 className="display-5">
            {`Hello, ${auth?.token && auth?.user?.name ? auth.user.name : 'Guest'}`}
          </h1>
          <p className="text-muted">
            {cart?.length > 0
              ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart.`
              : 'Your cart is empty.'}
            {!auth?.token && cart?.length > 0 && ' Please log in to proceed to checkout.'}
          </p>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.length > 0 ? (
              cart.map((product) => (
                <div key={product._id} className="card mb-3 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                        className="img-fluid rounded-start"
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.description.substring(0, 80)}...
                        </p>
                        <p className="card-text fw-bold">Price: ₹{product.price}</p>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveItem(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info text-center">
                Your cart is currently empty. Start shopping now!
              </div>
            )}
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5 className="card-title text-center">Order Summary</h5>
              <hr />
              <p className="fw-bold">
                Total Items: <span className="float-end">{cart?.length}</span>
              </p>
              <p className="fw-bold">
                Total Price: ₹
                <span className="float-end">
                  {cart.reduce((total, item) => total + item.price, 0)}
                </span>
              </p>
              <hr />
              {auth?.token ? (
                <button
                  className="btn btn-primary w-100"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => navigate('/login')}
                >
                  Login to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Address</h5>
                <button type="button" className="btn-close" onClick={handleCancelAddress}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to proceed with the address on file?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelAddress}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmAddress}>Yes, Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layouts>
  );
};

export default CartPage;
