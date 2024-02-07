import React, { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setuser] = useState({});
  let userEmail = localStorage.getItem("userEmail");
  const loadUser = async () => {
    const response = await fetch("http://localhost:5000/api/profileuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    });
    const json = await response.json();
    setuser(json);
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ "height": "100vh" }}>
      {
        user != {} ? <div className='d-flex justify-content-center'>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
        </div>
          :
          ""
      }
    </div>
  )
}
