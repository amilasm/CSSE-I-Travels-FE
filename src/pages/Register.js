import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";
export default function Register(props) {
    const [name, setname] = useState("");
    const [nic, setnic] = useState("");
    const [dob, setdob] = useState(" ");
    const [address, setaddress] = useState(" ");
    const [city, setcity] = useState(" ");
    const [postalcode, setpostalcode] = useState(" ");
    const [contact, setcontact] = useState(" ");
   
    function sendData(e) {


        e.preventDefault();
    
        const newProducr = {
          name,
          nic,
          dob,
          address,
          city,
          postalcode, contact
        }
    
        axios.post("http://localhost:8070/user/", newProducr).then(() => {
          ("bus added")
          setname('');
          setnic('');
          setdob('');
          setaddress('');
          setcity('');
          setpostalcode('');
          setcontact('');
    
          alert("User Successfully Registered  ..");
          window.location = './login'
    
        }).catch((err) => {
          alert("error");
        })
      }

    return (
        <div >
            <Row>
                <Col>
                        <div style={{ paddingLeft: '5vh', paddingTop: '1vh', paddingBottom: '5vh', paddingRight: '5vh' }}>

                            <h1>Register Form</h1>

                            <Card style={{
                            }} >
                                <Card.Body>


                                    <Form onSubmit={sendData}>

                                        <br />
                                        <div >

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>User Name:</Form.Label>
                                                <Form.Control type="text" name='Routeno'
                                                    onChange={(e) => setname(e.target.value)}
                                                    placeholder=" Enter User Name  .." required />
                                            </Form.Group>
                                            <Row>
                                            <Col><Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >NIC : </Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setnic(e.target.value)}

                                                    placeholder=" NIC  .." required />
                                            </Form.Group></Col>
                                            <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Date Of Birth : </Form.Label>
                                                <Form.Control type="date"
                                                    onChange={(e) => setdob(e.target.value)}

                                                    placeholder=" DOB  .." />
                                            </Form.Group></Col>

                                            </Row>
                                            

                                           

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Address : </Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setaddress(e.target.value)}
                                                    placeholder=" Address  .." />
                                            </Form.Group>


                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Cities : </Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setcity(e.target.value)}

                                                    placeholder=" City .." />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Postal Code : </Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setpostalcode(e.target.value)}

                                                    placeholder=" Postal Code .." />
                                            </Form.Group>  
                                            
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label >Contact Number : </Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setcontact(e.target.value)}

                                                    placeholder=" Contact Number .." />
                                            </Form.Group>

                                        </div>

                                        <div style={{ paddingLeft: "40%" }}>
                                            <Button type="submit" variant="danger">~ ~ Save ~ ~</Button>{' '} 
                                            <Link
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        to={{
                                            pathname: "/login",
                                        }}
                                    >
                                        <Button variant='danger'>Login</Button></Link>
                                        </div>
                                    </Form>

                                </Card.Body>
                            </Card>
                        </div>

                </Col>
                <Col>
                    <div style={{ paddingTop: '9vh', paddingLeft: '15vh' }}>
                        <Card style={{ width: '25rem' }}>


                            <img src="https://st2.depositphotos.com/1611230/7819/i/450/depositphotos_78196742-stock-photo-london-with-red-buses-against.jpg" />
                        </Card>

                    </div>

                </Col>
            </Row>


        </div>
    );
}
