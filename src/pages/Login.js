import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [name, setname] = useState("");
    const [nic, setnic] = useState("");
    const [all, setall] = useState("");
    function handleShow(e) {
        e.preventDefault();

        console.log(name);
        console.log(nic);

        setname(name);
        setnic(nic);
        for (let i = 0; i < all.length; i++) {
            if (name == all[i].name && nic == all[i].nic) {
                alert("Login Success !")
                window.location = './t'

            }
        }
        alert("Login Data is invalid !")

    }

    useEffect(() => {

        //get  funtion
        function getusers() {
            axios.get("http://localhost:8070/user/").then((res) => {
                setall(res.data);
                console.log(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }

        getusers();
    }, [])

    return (
        <div >
            <Row>
                <Col>
                    <div style={{ paddingTop: '9vh', paddingLeft: '15vh' }}>
                        <Card style={{ width: '25rem' }}>


                            <img src="https://images.unsplash.com/photo-1580114963757-1cf1d0b69126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlZCUyMGJ1c3xlbnwwfHwwfHw%3D&w=1000&q=80" />
                        </Card>

                    </div>
                </Col>
                <Col>
                    <div style={{ paddingTop: '24vh', paddingBottom: '4vh', paddingLeft: '1vh', paddingRight: '3vh' }}>

                        <h6>Login</h6>

                        <Card style={{ width: '38rem' }}>
                            <div style={{ paddingTop: '4vh', paddingBottom: '4vh', paddingLeft: '2vh', paddingRight: '3vh' }}>
                                <Form onSubmit={handleShow}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label >User Name : </Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setname(e.target.value)}
                                            placeholder=" Enter User Name  .." required />
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label >NIC : </Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setnic(e.target.value)}

                                            placeholder=" NIC  .." />
                                    </Form.Group>

                                    <div style={{ paddingLeft: "40%" }}>
                                        <Button type="submit" variant="danger">Log In</Button>{' '}

                                    </div><Link
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        to={{
                                            pathname: "/",
                                        }}
                                    >
                                        <Button variant='danger'>Register</Button></Link>

                                </Form>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>


        </div>
    );
}
