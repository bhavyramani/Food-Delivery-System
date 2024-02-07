import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://go-food-bydq.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password:credentials.password })
    });
    const json = await response.json();

    if (!json['success']) {
      if(json['errors']){
        alert(json['errors'][0]['msg']);
        console.log(json['errors']);
      }
      else
        alert("Enter valid credentials");
    }else{
      localStorage.setItem("userName", json.username);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);

      navigate("/");
    }

  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value })
  };
  return (
    <div className=' align-items-center h-100 d-flex'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>Create an account</Link>
        </form>
      </div>
    </div>
  )
}
