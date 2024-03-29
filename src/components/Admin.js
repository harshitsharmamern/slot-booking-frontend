import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


const Admin = () => {
    // const host = process.env.NODE_ENV === 'production' ? 'https://evalleyhackathon.herokuapp.com' : 'http://localhost:5000';
    // const host = 'http://localhost:5000'
    const host = 'https://slot-booking-backend.onrender.com';

    // get the user and first check it it is admin
    const [admin, setAdmin] = useState(false);
    useEffect(()=>{
        fetch(`${host}/api/auth/getuser`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        .then((response) => {return response.json()})
        .then((data) => {
            // console.log('Success:', data);
            if(data.role==='admin'){
                setAdmin(true);
            }
        })
        .catch((error) => {
            alert("Unauthorized")
            console.error('Error:', error);
        });
    }, [])
    
  return (
    <div>
        {admin?<>
            <h1 className='my-3'>Welcome to the platform analysis</h1>

            <div className="card w-75 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">All Areas</h5>
                <p className="card-text">Get all the information about the areas providing slots, add a new area and delete any existing area.</p>
                <Link to="/admin/areas" className="btn btn-primary">Areas</Link>
            </div>
            </div>

            <div className="card w-50 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">All Users</h5>
                <p className="card-text">Get all the information ragarding the existing users on this platform, there activities, make any user admin etc.</p>
                <Link to="/admin/users" className="btn btn-primary">Users</Link>
            </div>
            </div>
            <div className="card w-50 my-5 mx-3">
            <div className="card-body">
                <h5 className="card-title">Revenue details</h5>
                <p className="card-text">Get all the information about revenue generated by booking of slots</p>
                <Link to="/admin/revenue" className="btn btn-primary">Revenue</Link>
            </div>
            </div>
        
        </>: <>
        <div class="alert alert-danger" role="alert">
            Error: You are not authorized to access this page
        </div>
            {/* <h2>Unauthorized</h2> */}
        </>}


    </div>
  )
}

export default Admin