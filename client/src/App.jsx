import './App.css'
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';
import Profile from './screens/Profile.jsx';


function App() {


  return (
    <CartProvider>
      <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
