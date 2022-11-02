import React, { useState, useEffect } from "react";
import { Table, Row, Card, Modal, Form, Col,Button } from "react-bootstrap";
import axios from "axios";
import {  FaTrashAlt, FaPencilAlt } from "react-icons/fa";



function Viewuser(props) {
    const [order, setorder] = useState([]);
    const [search, setSearch] = useState("");
    const [bustrip, setbustrip] = useState([]);
    const [busno, setbusno] = useState("");
    const [routeno, setrouteno] = useState("");
    const [capacity, setcapacity] = useState(" ");
    const [type, settype] = useState(" ");
    const [roottype, setroottype] = useState(" ");
    const [time, settime] = useState(" ");
    const [status, setstatus] = useState(" ");
    const [from, setfrom] = useState(" ");
    const [to, setto] = useState(" ");
    const [_id, setid] = useState(" ");
    const [noofbus, setnoofbus] = useState(" ");
    const [price, setprice] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (_id, busno,
        routeno,
        capacity,
        type,
        roottype,
        time, from, to, noofbus, price, status
    ) => {
        setShow(true);
        setid(_id);
        setbusno(busno);
        setrouteno(routeno);
        setcapacity(capacity);
        settype(type);
        setroottype(roottype);
        settime(time);
        setfrom(from);
        setto(to);
        setnoofbus(noofbus);
        setprice(price);

        setstatus(status);
    }
    
    
    useEffect(() => {

        //get funtion
        function getorder() {
            axios.get("http://localhost:8070/user/").then((res) => {
                setorder(res.data);
              
            }).catch((err) => {
                alert(err.message);
            })
        }

        getorder();
    }, [])

    function onDelete(_id) {
        console.log(_id);
        axios.delete("http://localhost:8070/user/" + _id).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
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

                                                    <td>
                                                        <Button variant="outline-success" onClick={() => handleShow(bustrip._id, bustrip.busno, bustrip.routeno, bustrip.capacity, bustrip.type, bustrip.roottype, bustrip.time, bustrip.from, bustrip.to, bustrip.noofbus, bustrip.price, bustrip.status)} ><FaPencilAlt /></Button>
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
                    <Modal.Title>Edit Manager Details </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col>
                                <div >
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control placeholder="Enter User Name"
                                        value={busno}
                                        onChange={(e) => setbusno(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>DOB</Form.Label >
                                    <Form.Control placeholder="Enter DOB"
                                        value={routeno}
                                        onChange={(e) => setrouteno(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>Contact Number</Form.Label >
                                    <Form.Control placeholder="Enter Contact Number"
                                        value={capacity}
                                        onChange={(e) => setcapacity(e.target.value)} />
                                </div>
                            </Col>

                            <Col>
                                <div >
                                    <Form.Label>NIC</Form.Label >
                                    <Form.Control placeholder="Enter NIC"
                                        value={time}
                                        onChange={(e) => settime(e.target.value)} />
                                </div>

                                <div>                                    
                                    <Form.Label>Address </Form.Label >

                                    <Form.Control placeholder="Enter Address"
                                        value={time}
                                        onChange={(e) => settime(e.target.value)} />
                                </div>
                                <div >

                                    <Form.Label>Postal Code</Form.Label >
                                    <Form.Control placeholder="Enter Postal Code"
                                        value={from}
                                        onChange={(e) => setfrom(e.target.value)} />
                                </div>

                            </Col>
                        </Row>
                        <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                            <Button variant="outline-danger" type="submit" >Edit</Button>
                            {' '}<Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div >

                    </Form>
                </Modal.Body>

            </Modal>
        </div>


    );

}
export default Viewuser;



