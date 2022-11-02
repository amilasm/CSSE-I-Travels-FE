import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function ViewShedule(props) {
    const [bustrip, setbustrip] = useState([]);
    const [search, setSearch] = useState("");
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
        function getbus() {
            axios.get("http://localhost:8070/bustrip/").then((res) => {
                setbustrip(res.data);
                console.log(res.data.length);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getbus();
    }, [])

    //delete funtion
    function onDelete(_id) {
        console.log(_id);
        axios.delete("http://localhost:8070/bustrip/" + _id).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };


    function update() {
        const newTime = {
            busno,
            routeno,
            capacity,
            type,
            roottype,
            time, status, from, to, noofbus, price
        }

        axios.put("http://localhost:8070/bustrip/" + _id, newTime).then(() => {
            setbusno('');
            setrouteno('');
            setcapacity('');
            settype('');
            setroottype('');
            settime('');
            setstatus('');
            setfrom('');
            setto('');
            setnoofbus('');
            setprice('');

            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))


    }
    return (
        <div>
            <div style={{ paddingLeft: "1vh", color: 'white' }}>
                
            </div>
            <div style={{ paddingLeft: '1vh', paddingRight: '7vh', paddingBottom: '2vh' }}>
                <Card border="secondary">
                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ paddingLeft: "40%", paddingBottom: "3vh" }}>Analysis Report</h1>


                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="Search from 'Bus No' " className="mr-2"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} />
                                    </div>

                                </div>

                            </div>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>
                                        <th>Bus No</th>
                                        <th>Route No</th>
                                        <th>Capacity</th>
                                        <th>Type</th>
                                        <th>Root Type</th>
                                        <th>Time</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>No Of Bus</th>
                                        <th>Price in Root</th>
                                        <th>Status</th>

                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {bustrip.filter(bustrip => {
                                        if (search === "") {
                                            return bustrip
                                        }
                                        else if (bustrip.busno.toLowerCase().includes(search.toLowerCase())) {
                                            return bustrip
                                        }
                                    }).
                                        map((bustrip) => {

                                            return (
                                                <tr key={bustrip._id}>
                                                    <td>{bustrip.busno}</td>
                                                    <td>{bustrip.routeno}</td>
                                                    <td>{bustrip.capacity}</td>
                                                    <td>{bustrip.type}</td>
                                                    <td>{bustrip.roottype}</td>
                                                    <td>{bustrip.time}</td>
                                                    <td>{bustrip.from}</td>
                                                    <td>{bustrip.to}</td>
                                                    <td>{bustrip.noofbus}</td>
                                                    <td>{bustrip.price}</td>
                                                    <td>{bustrip.status}</td>
                                                    <td>
                                                        <Button variant="outline-success" onClick={() => handleShow(bustrip._id, bustrip.busno, bustrip.routeno, bustrip.capacity, bustrip.type, bustrip.roottype, bustrip.time, bustrip.from, bustrip.to, bustrip.noofbus, bustrip.price, bustrip.status)} ><FaPencilAlt /></Button>
                                                    </td>

                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => onDelete(bustrip._id)}><FaTrashAlt /></Button>

                                                    </td>
                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >

                        </div>
                    </div>



                </Card>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col>
                                <div >
                                    <Form.Label>Bus No :</Form.Label>
                                    <Form.Control placeholder="busno"
                                        value={busno}
                                        onChange={(e) => setbusno(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>Rout No : </Form.Label >
                                    <Form.Control placeholder="routeno"
                                        value={routeno}
                                        onChange={(e) => setrouteno(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>Capacity :</Form.Label >
                                    <Form.Control placeholder="capacity"
                                        value={capacity}
                                        onChange={(e) => setcapacity(e.target.value)} />
                                </div>

                                <div >

                                    <Form.Label>Type :</Form.Label >
                                   
                                        <Form.Select aria-label="Default select example" value={type}
                                        onChange={(e) => settype(e.target.value)} >
                                        <option>{type}</option>
                                        <option value="super-Luxury">super-Luxury</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="semi-Luxury">semi-Luxury</option>
                                        <option value="Normal-Service">Normal-Service</option>

                                    </Form.Select>
                                </div>

                                <div >
                                    <Form.Label>Root Type :</Form.Label>
                                    <Form.Control placeholder="roottype"
                                        value={roottype}
                                        onChange={(e) => setroottype(e.target.value)} />
                                </div>
                            </Col>

                            <Col>
                                <div >
                                    <Form.Label>Time : </Form.Label >
                                    <Form.Control placeholder="time"
                                        value={time}
                                        onChange={(e) => settime(e.target.value)} />
                                </div>

                                <div>                                    
                                    <Form.Label>Status : </Form.Label >

                                    <Form.Select aria-label="Default select example" value={status}
                                        onChange={(e) => setstatus(e.target.value)} >
                                        <option>{status}</option>
                                        <option value="Active">Active</option>
                                        <option value="Close">Close</option>
                                    </Form.Select>
                                </div>
                                <div >

                                    <Form.Label>From :</Form.Label >
                                    <Form.Control placeholder="from"
                                        value={from}
                                        onChange={(e) => setfrom(e.target.value)} />
                                </div>

                                <div >

                                    <Form.Label>To :</Form.Label >
                                    <Form.Control placeholder="to"
                                        value={to}
                                        onChange={(e) => setto(e.target.value)} />
                                </div>
                                <div >
                                    <Form.Label>No Of Bus: </Form.Label >
                                    <Form.Control placeholder="noofbus"
                                        type='text'
                                        value={noofbus}
                                        onChange={(e) => setnoofbus(e.target.value)} />
                                </div>

                                <div >
                                    <Form.Label>Price: </Form.Label >
                                    <Form.Control placeholder="price"
                                        type='text'
                                        value={price}
                                        onChange={(e) => setprice(e.target.value)} />
                                </div>

                            </Col>
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
        </div>


    );

}
export default ViewShedule;



