import React, { useState, useEffect } from "react";
import { Table, Row, Card, Modal, Form, Col,Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  FaTrashAlt, FaPencilAlt } from "react-icons/fa";



function Viewuser(props) {
    const [order, setorder] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setname] = useState("");
    const [dob, setdob] = useState("");
    const [enabled, setenabled] = useState("");
    const [contact, setcontact] = useState(" ");
    const [address, setaddress] = useState(" ");
    const [nic, setnic] = useState(" ");
    const [postalcode, setpostalcode] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const notify = () => toast("User Updated Succefully!");
    const notifyerror = () => toast("Error occured!");
    const notifydelete = () => toast("User Deleted Succefully!");
    const handleShow = (
        _id,
        name,
        dob,
        contact,
        address,
        nic, 
        postalcode,
        enabled
        
    ) => {
        setShow(true);
        setid(_id);
        setname(name);
        setdob(dob);
        setcontact(contact);
        setaddress(address);
        setnic(nic);
        setpostalcode(postalcode);
        setenabled(enabled);
    }
    
    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };


    function update() {
        const newTime = {
        name,
        dob,
        contact,
        address,
        nic, 
        postalcode,
        enabled
        
        }

        axios.put("http://localhost:8070/user/" + _id, newTime).then(() => {
            setname('');
            setdob('');
            setcontact('');
            setaddress('');
            setnic('');
            setpostalcode('');
            setenabled('');
            handleClose();
            notify();
            window.location.reload();
        }).catch((err => {
            notifyerror();
        }))


    }
    
    useEffect(() => {

        //get funtion
        function getorder() {
            axios.get("http://localhost:8070/user/").then((res) => {
                setorder(res.data);
              
            }).catch((err) => {
                notifyerror();
            })
        }

        getorder();
    }, [])

    function onDelete(_id) {
        console.log(_id);
        
        axios.delete("http://localhost:8070/user/" + _id).then((res) => {
            notifydelete();
            window.location.reload();
        }).catch((err) => {
            notifyerror();
        })
        
        
    }



    return (
        <div>
            <div style={{ paddingLeft: "1vh", color: 'white', paddingTop: '1vh' }}>
             
            </div>
            <div style={{ paddingLeft: '1vh', paddingRight: '7vh', paddingTop: '3vh', paddingBottom: '4vh', }}>
                <Card border="">
                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh",boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)",overflowY: 'scroll', height:'800px' }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "2vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ textAlign:"center", fontWeight:"bold" }}>Registered Managers</h1>
<hr></hr>
                            

                            <div style={{ paddingleft: "5vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "2vh", paddingTop: "4vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="   Search Users" className="mr-2" style={{borderRadius:"20px"}}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} />
                                    </div>

                                </div>

                            </div>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>
                                        <th>Name</th>
                                        <th>NIC</th>
                                        <th>Dob</th>
                                        <th>Address</th>
                                        <th>Postal Code</th>
                                        <th>Contact number</th>
                                        <th>Role</th>
                                        <th>Status</th>

                                        <th>Edit</th>    
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {order.filter(Order => {
                                        if (search === "") {
                                            return Order
                                        }
                                        else if (Order.name.toLowerCase().includes(search.toLowerCase())) {
                                            return Order
                                        }
                                    }).
                                        map((Order) => {

                                            return (
                                                <tr key={Order._id}>
                                                    <td>{Order.name}</td>
                                                    <td>{Order.nic}</td>
                                                    <td>{Order.dob}</td>
                                                    <td>{Order.address}</td>
                                                    <td>{Order.postalcode}</td>
                                                    <td>{Order.contact}</td>
                                                    <td>{Order.account_type}</td>
                                                    <td>{Order.enabled}</td>

                                                    <td>
                                                        <Button variant="outline-success" onClick={() => handleShow(Order._id, Order.name, Order.dob, Order.contact, Order.address, Order.nic, Order.postalcode, Order.enabled)} ><FaPencilAlt /></Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => onDelete(Order._id)}><FaTrashAlt /></Button>

                                                    </td>

                                                  
                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >

                        </div>
                    </div>



                </Card> <br/>
                
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {name}'s Details </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col>
                                <div >
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control placeholder="Enter User Name"
                                        value={name} required
                                        onChange={(e) => setname(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>DOB</Form.Label >
                                    <Form.Control placeholder="Enter DOB" type='date'
                                        value={dob} required
                                        onChange={(e) => setdob(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>Contact Number</Form.Label >
                                    <Form.Control placeholder="Enter Contact Number" type='number'
                                        value={contact} required
                                        onChange={(e) => setcontact(e.target.value)} />
                                </div>
                            </Col>

                            <Col>
                                <div >
                                    <Form.Label>NIC</Form.Label >
                                    <Form.Control placeholder="Enter NIC"
                                        value={nic} required
                                        onChange={(e) => setnic(e.target.value)} />
                                </div>

                                <div>                                    
                                    <Form.Label>Address </Form.Label >

                                    <Form.Control placeholder="Enter Address"
                                        value={address} required
                                        onChange={(e) => setaddress(e.target.value)} />
                                </div>
                                <div >

                                    <Form.Label>Postal Code</Form.Label >
                                    <Form.Control placeholder="Enter Postal Code"
                                        value={postalcode} required
                                        onChange={(e) => setpostalcode(e.target.value)} />
                                </div>

                            </Col>
                                <div >

                                    <Form.Label>Status</Form.Label >
                                   
                                        <Form.Select aria-label="Default select example" value={enabled}
                                        onChange={(e) => setenabled(e.target.value)} >
                                        <option>{enabled}</option>
                                        <option value="Active">Active</option>
                                        <option value="Disabled">Disabled</option>

                                    </Form.Select>
                                </div>
                        </Row>
                        <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                            <Button variant="outline-danger" type="submit" onClick={(e) => updateUser(e)}>Edit</Button>
                            {' '}<Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            
                        </div >

                    </Form>
                </Modal.Body>

            </Modal>
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
export default Viewuser;



