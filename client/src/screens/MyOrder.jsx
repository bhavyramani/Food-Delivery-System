import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function MyOrder() {
    const [orderData, setorderData] = useState("");
    let count = 0;
    const fetchMyOrder = async () => {
        let userEmail = localStorage.getItem('userEmail');
        await fetch(`${BACKEND_URL}/api/myOrderData`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: userEmail
            })
        }).then(async (res) => {
            let response = await res.json();
            setorderData(response);
        });
    };

    const handleDeleteOrder = async (arrayData) => {
        if (!confirm("Are you sure you want to cancel this order?"))
            return;
        let userEmail = localStorage.getItem('userEmail');
        await fetch(`${BACKEND_URL}/api/deleteorder`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                arrayData: arrayData
            })
        }).then(async (res) => {
            let response = await res.json();
            setorderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div style={{ "position": "sticky", "top": "0", "zIndex": "11" }}><Navbar /></div>
            <div className='container'>
                <div className='row'>

                    {orderData != {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div key={count++} >
                                                    {arrayData.Order_date ?
                                                        <div>
                                                            <div className='m-auto mt-5 fs-4 d-flex' style={{ justifyContent: "space-between" }}>

                                                                {arrayData.Order_date}
                                                                <button type="button" className="btn p-0" onClick={() => { handleDeleteOrder(item) }}><DeleteIcon className='mx-5' style={{ "marginBottom": "2" }} data-bs-theme='light' width={20} height={10} alt='NotLoaded' ></DeleteIcon></button>
                                                            </div>
                                                            <hr />
                                                        </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) :
                        ""
                    }
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
