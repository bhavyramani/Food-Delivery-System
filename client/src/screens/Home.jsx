import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);
    const [search, setsearch] = useState("");

    const loadData = async () => {
        let response = await fetch(`${BACKEND_URL}/api/fooddata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div style={{"position":"sticky", "top":"0", "zIndex":"11"}}><Navbar/></div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} data-bs-theme="dark">
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ "zIndex": "2" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                            <button className="btn btn-outline-success text-white" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ "filter": "brightness(35%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ "filter": "brightness(35%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ "filter": "brightness(35%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon color-dark" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {
                    foodCat != []
                        ? foodCat.map((data) => {
                            return (
                                
                                <div key={data._id} className='row mb-3'>
                                    
                                    <div className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem != []
                                            ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map((filtered_item) => {
                                                    return (
                                                        <div key={filtered_item._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodItem = {filtered_item}
                                                                options={filtered_item.options[0]}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            : ""
                                    }
                                </div>

                            )
                        }) : ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}
