import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AreaContext from '../context/AreaContext';
import Navbar from './Navbar';

const Login = (props) => {
    const navigate = useNavigate();
    const context = useContext(AreaContext);
    const {isAdmin, setIsAdmin} = context;

    const [credentials, setCredentials] = useState({email: "", password: ""});
    // const host = process.env.NODE_ENV === 'production' ? 'https://evalleyhackathon.herokuapp.com' : 'http://localhost:5000';
    // const host = 'http://localhost:5000'
    const host = 'https://slot-booking-backend.onrender.com';


    const handleSubmit = async (e)=>{
        e.preventDefault();




        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        // console.log('email: ', credentials.email);
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/areas");
            // props.showAlert("Logged in succesfully", "success");
            // Checking if user is admin or not
            fetch(`${host}/api/auth/getuser`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            .then((response) => response.json())
            .then((data) => {
                // console.log('USER IS:', data);
                if(data.role==='admin'){
                    setIsAdmin(true);
                }
                // Navbar.forceUpdate();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            window.location.reload();
        }
        else{
            alert("Invalid credentials");
            console.log("Please enter valid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <div>
        
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5 signin-row" > 
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
        <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" name='email' placeholder="Email" value={credentials.email} onChange={onChange}/>
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" name='password' placeholder="Password" value={credentials.password} onChange={onChange}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
          
        </form>
      </div>
    </div>
  </div>

    </div>
  )
}

export default Login