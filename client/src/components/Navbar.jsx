import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    const navigate = useNavigate();
    const [cartview, setcartview] = useState(false);
    let data = useCart();
    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        navigate("/");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken"))?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                :""
                            }
                        </ul>
                        {
                            (localStorage.getItem("userName"))?
                            <Link className='btn fs-4' to="/profile">
                                {localStorage.getItem("userName")}
                            </Link>
                            :""
                        }
                        {
                            (!localStorage.getItem("authToken"))?
                        <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1 " to="/createuser">Sign Up</Link>
                        </div>
                        :
                        <>
                            <div className="btn bg-white text-success mx-2" onClick={()=>{setcartview(true)}}>
                                My Cart {" "}
                                {(data.length)?
                                <Badge pill bg="danger">{data.length}</Badge>
                                :""
                                }
                            </div>
                            {
                                cartview?
                                <Model onClose={()=>setcartview(false)}><Cart/></Model>
                                :null
                            }
                            <div className="btn bg-white text-success mx-2 text-danger" onClick={handleLogout}>
                                Log Out
                            </div>
                        </>

                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
