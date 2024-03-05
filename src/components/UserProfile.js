import React, { useState } from 'react'
import { useEffect } from 'react'

const UserProfile = () => {
    const [user, setUser] = useState({name: "", email: "",phone: "", role: ""});
    const authToken = localStorage.getItem('token');
    console.log(authToken);
    console.log("role, ", user.role);
    // const host = process.env.NODE_ENV === 'production' ? 'https://evalleyhackathon.herokuapp.com' : 'http://localhost:5000';
    // const host = 'http://localhost:5000'
    const host = 'https://slot-booking-backend.onrender.com';
    useEffect(() => {
        fetch(`${host}/api/auth/getuser`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
        })
        .then((response) => {return response.json()})
        .then((data) => {
            console.log('Success:', data);
            setUser({name: data.name, email: data.email, role: data.role, phone: data.phone});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        // getAreas();
        // eslint-disable-next-line
    }, [])
    

  return (
    <div>
        <section className="vh-100" style={{backgroundColor: "#f4f5f7"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-6 mb-4 mb-lg-0">
        <div className="card mb-3" style={{borderRadius: ".5rem"}}>
          <div className="row g-0">
            <div className="col-md-4 gradient-custom text-center text-white"
              style={{borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem"}}>
              <img src="https://www.ateneo.edu/sites/default/files/styles/large/public/2021-11/istockphoto-517998264-612x612.jpeg?itok=aMC1MRHJ"
                alt="Avatar" className="img-fluid my-5" />
              <h5>{user.name}</h5>
              <i className="far fa-edit mb-5"></i>
            </div>
            <div className="col-md-8">
              <div className="card-body p-4">
                <h4>User Information</h4>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div>
                    <h6 >&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;: </h6>
                    <h6>&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</h6>
                  </div>
                </div>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div>
                    <h6 >&nbsp;&nbsp;&nbsp;&nbsp;Phone&nbsp;: </h6>
                    <h6>&nbsp;&nbsp;&nbsp;&nbsp;{user.phone}</h6>
                  </div>
                </div>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div>
                    <h6 >&nbsp;&nbsp;&nbsp;&nbsp;Role&nbsp;: </h6>
                    <h6>&nbsp;&nbsp;&nbsp;&nbsp;{user.role}</h6>
                  </div>
                </div>
                <hr className="mt-0 mb-4"/>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default UserProfile