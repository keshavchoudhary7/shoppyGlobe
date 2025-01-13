import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { AdminRoute } from './components/routes/AdminRoute'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProducts from './pages/Admin/CreateProducts'
import Users from './pages/Admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import SearchPage from './pages/SearchPage'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'


function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:slug' element={<ProductDetails/>}/> 
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/category/:slug' element={<CategoryProduct/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
    </Route>

    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProducts/>}/>
      <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
      <Route path='admin/product' element={<Products/>}/>
      <Route path='admin/users' element={<Users/>}/>
    </Route>
    
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/policy' element={<Policy/>}/>
    <Route path='/*' element={<PageNotFound/>}/>
  </Routes>
  </>
  )
}

export default App
