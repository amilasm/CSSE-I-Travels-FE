import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from "axios";
import './assets/css/login.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(props) {
    const [name, setname] = useState("");
    const [nic, setnic] = useState("");
    const [dob, setdob] = useState(" ");
    const [address, setaddress] = useState(" ");
    const [postalcode, setpostalcode] = useState(" ");
    const [contact, setcontact] = useState(" ");
    const notify = () => toast("User Register Succefull!");
    const notifyerror = () => toast("User Register Unsuccefull!");
   
    function sendData(e) {


        e.preventDefault();
    
        const newProducr = {
          name,
          nic,
          dob,
          address,
          postalcode,
          contact
        }
    
        axios.post("http://localhost:8070/user/", newProducr).then(() => {
          ("bus added")
          setname('');
          setnic('');
          setdob('');
          setaddress('');
          setpostalcode('');
          setcontact('');
    
          notify();
          window.location = './'
    
        }).catch((err) => {
          notifyerror();
        })
      }

    return (
        <div >
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>Travel-X Register</title>
  <link href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"/>
</head>
<body>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="https://i.postimg.cc/ht4nx4n5/JV-Revamping-your-website-FA-P1.gif" alt="login" class="login-card-img"/>
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="https://i.postimg.cc/LsdrjBz8/paper-airplane-travel-logo-260nw-562039321.jpg" alt="logo" class="logo"/>
              </div>
              <p class="login-card-description">Sign up into Manager Account</p>
              <form onSubmit={sendData}>
                <div className="row">
                <div className="col">
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">User Name</label>
                    <input type="text" onChange={(e) => setname(e.target.value)} class="form-control" placeholder="Enter Your User Name" required/>
                  </div>
                  </div>
                  <div className="col">
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">NIC</label>
                    <input type="text" onChange={(e) => setnic(e.target.value)} class="form-control" placeholder="Enter Your NIC" required/>
                  </div>
                  </div>
                  </div>

                  <div className="row">
                <div className="col">
                  <div class="form-group">
                    <label for="email" class="sr-only">Date Of Birth</label>
                    <input type="date" onChange={(e) => setdob(e.target.value)} class="form-control" required placeholder="Enter Your User Name"/>
                  </div>
                  </div>
                  <div className="col">
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Address</label>
                    <input type="text" onChange={(e) => setaddress(e.target.value)} class="form-control" placeholder="Enter Your Address" required/>
                  </div>
                  </div>
                  </div>

                  <div className="row">
                <div className="col">
                  <div class="form-group">
                    <label for="email" class="sr-only">Postal Code</label>
                    <input type="text" onChange={(e) => setpostalcode(e.target.value)} class="form-control" required placeholder="Enter Your City Postal Code"/>
                  </div>
                  </div>
                  <div className="col">
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Contact Number</label>
                    <input type="number" onChange={(e) => setcontact(e.target.value)} class="form-control" placeholder="Enter Your Contact Number" required/>
                  </div>
                  </div>
                  </div>
                  
                  <input type="submit" class="btn btn-block login-btn mb-4" value="Register"/>
                </form>
                <a href="#!" class="forgot-password-link">Forgot password?</a>
                <p class="login-card-footer-text">Already have an account? <Link to="/"><a href="#!" class="text-reset">Sign in here</a></Link></p>
                <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>

<ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />

        </div>
    );
}
