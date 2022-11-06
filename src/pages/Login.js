import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from "axios";
import './assets/css/login.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    const [name, setname] = useState("");
    const [nic, setnic] = useState("");
    const [all, setall] = useState("");
    const [islogged, setislogged] = useState(false);
    const notify = () => toast("Login Succefully!");
    const notifyerror = () => toast("Login Data Invalid!");
    const notifydelete = () => toast("Error Occured!");
    function handleShow(e) {
        e.preventDefault();

        let checklog = false;
        console.log(name);
        console.log(nic);

        setname(name);
        setnic(nic);
        for (let i = 0; i < all.length; i++) {
            if (name == all[i].name && nic == all[i].nic && all[i].enabled == "Active") {
                notify();
                checklog = true;
                localStorage.setItem("account_type", all[i].account_type)
                window.location = './t'

            }
        }
        console.log(checklog);
        if (checklog === false){
          notifyerror();
        }
        

    }

    useEffect(() => {

        //get  funtion
        function getusers() {
            axios.get("http://localhost:8070/user/").then((res) => {
                setall(res.data);
                console.log(res.data);

            }).catch((err) => {
              notifydelete();
            })
        }

        getusers();
    }, [])

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
            <img src="https://i.postimg.cc/TYLmBrDx/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3-car-202x158.gif" alt="login" class="login-card-img"/>
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="https://i.postimg.cc/LsdrjBz8/paper-airplane-travel-logo-260nw-562039321.jpg" alt="logo" class="logo"/>
              </div>
              <p class="login-card-description">Sign in into Your Account</p>
              <form onSubmit={handleShow}>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">User Name</label>
                    <input type="text" onChange={(e) => setname(e.target.value)} class="form-control" placeholder="Enter Your User Name" required/>
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">NIC</label>
                    <input type="text" onChange={(e) => setnic(e.target.value)} class="form-control" placeholder="Enter Your NIC" required/>
                  </div>
                  
                  <input type="submit" class="btn btn-block login-btn mb-4" value="Sign in"/>
                </form>
                <a href="#!" class="forgot-password-link">Forgot password?</a>
                <p class="login-card-footer-text">Don't have an account? <Link to="/register"><a href="#!" class="text-reset">Sign up here</a></Link></p>
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
