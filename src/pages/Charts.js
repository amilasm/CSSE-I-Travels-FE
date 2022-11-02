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



    return (
        <div>
        <h2 style={{fontWeight:"bold",paddingTop: "0vh"}}>Dashboard</h2>
        <hr></hr>

            <div style={{ paddingLeft: '4vh', paddingTop: '1vh'}}>

                <Row>
                    <Col>
                        <Card style={{ width: '35rem',boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)" }}>

                            <div style={{paddingTop: '2vh',paddingRight: '2vh', paddingBottom:"1vh" }}>
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
                            <div style={{ paddingBottom: '2vh', paddingTop: '0.5vh' }}>

                                <Col>
                                    <Card style={{ width: '25rem' ,backgroundImage: "url(https://i.postimg.cc/m2C3tY2w/diseno-web.gif)" }}>
                                        <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%',boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)" , fontWeight:"bold"}}>

                                            Total Customers: {passengercount} <br />
                                        </div>
                                    </Card>
                                </Col>
                            </div>
                            <Col>
                                <div style={{ paddingBottom: '2vh', paddingTop: '1vh' }}>

                                    <Card style={{ width: '25rem',backgroundImage: "url(https://cdn.dribbble.com/users/3593902/screenshots/6886578/bus-animation-1.gif)" }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%',boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)", fontWeight:"bold" }}>

                                        Total Bus Trips: {bustripcount}<br />
                                        </div>
                                    </Card>
                                </div>
                            </Col>

                            <Col>
                                <div style={{ paddingBottom: '2vh', paddingTop: '1vh' }}>

                                    <Card style={{ width: '25rem' ,backgroundImage: "url(https://i.postimg.cc/HxZFDZt2/mobile-app.gif)" }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%',boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)", fontWeight:"bold" }}>

                                        Total Fare : {total}
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <div style={{ paddingLeft: '3vh', paddingTop: '3vh', paddingRight: '5vh', lineHeight:"40px", boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)",overflowY: 'scroll', height:'500px'}}>
                    <Row>
                        <div>
                            <h3 style={{fontWeight:"bold"}}>Total Shedules</h3>
                            <br/>
                            <Table striped bordered hover variant="light" >
                                <thead >

                                    <tr>
                                        <th>Route No</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Time</th>
                                        <th>No Of Buses</th>
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

                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >
                        </div>

                    </Row>
                </div>
            </div>

        </div>
    );
}
