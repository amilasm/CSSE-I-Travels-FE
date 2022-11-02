import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import axios from "axios";
import {  XAxis, YAxis, Tooltip,  ResponsiveContainer, AreaChart, Area } from 'recharts';
import {  FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Charts() {
    const [passenger, setpassenger] = useState([]);
    const [bustrip, setbustrip] = useState([]);
    const [passengercount, setpassengercount] = useState('');
    const [total, settotal] = useState('');
    const [bustripcount, setbustripcount] = useState('');
    const [_id, setid] = useState(" ");
    let tot = 0;



    useEffect(() => {

        //get  funtion
        function getpassengers() {
            axios.get("http://localhost:8070/passenger/").then((res) => {
                setpassenger(res.data);
                setpassengercount(res.data.length);
                for (let i = 0; i < res.data.length; i++) {


                    tot = tot + parseInt(res.data[i].total);
                }
                settotal(tot);

            }).catch((err) => {
                alert(err.message);
            })
        }

        //get  funtion
        function getbus() {
            axios.get("http://localhost:8070/bustrip/").then((res) => {
                setbustrip(res.data);
                console.log(res.data.length);
                setbustripcount(res.data.length);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getpassengers();
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


    return (
        <div>


            <div style={{ paddingLeft: '4vh', paddingTop: '1vh' }}>

                <Row>
                    <Col>
                        <Card style={{ width: '35rem' }}>

                            <div style={{ paddingLeft: '2vh', paddingTop: '2vh' }}>
                                <div >
                                    <ResponsiveContainer width="100%" height={200}>
                                        <AreaChart data={bustrip}>
                                            <XAxis dataKey="routeno" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area dataKey="noofbus" fill="rgba(106, 110, 229)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col>

                        <Row>
                            <div style={{ paddingBottom: '2vh', paddingTop: '1vh' }}>

                                <Col>
                                    <Card style={{ width: '25rem' }}>
                                        <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                            Total Customers: {passengercount} <br />
                                        </div>
                                    </Card>
                                </Col>
                            </div>
                            <Col>
                                <div style={{ paddingBottom: '2vh', paddingTop: '1vh' }}>

                                    <Card style={{ width: '25rem' }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                        Total Bus Trips: {bustripcount}<br />
                                        </div>
                                    </Card>
                                </div>
                            </Col>

                            <Col>
                                <div style={{ paddingBottom: '2vh', paddingTop: '1vh' }}>

                                    <Card style={{ width: '25rem' }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                        Total Fare : {total}
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Col>


                </Row>
                <div style={{ paddingLeft: '3vh', paddingTop: '5vh', paddingRight: '5vh' }}>
                    <Row>
                        <div>
                            <h6>Total Shedules</h6>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>
                                        <th>Route No</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Time</th>
                                        <th>No Of Buses</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {bustrip.
                                        map((bustrip) => {

                                            return (
                                                <tr key={bustrip._id}>
                                                    <td>{bustrip.routeno}</td>
                                                    <td>{bustrip.from}</td>
                                                    <td>{bustrip.to}</td>
                                                    <td>{bustrip.time}</td>
                                                    <td>{bustrip.noofbus}</td>


                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => onDelete(bustrip._id)}><FaTrashAlt /></Button>

                                                    </td>

                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >

                            <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/viewshedule",
                        }}
                    >
                            <Button variant="danger">Analysis Report</Button>
                            </Link> {' '} <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/Shedule",
                        }}
                    ><Button variant="danger"> Add Shedule</Button>
                    </Link>
                        </div>

                    </Row>
                </div>
            </div>

        </div>
    );
}
