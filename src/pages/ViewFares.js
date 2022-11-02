import React, { useState, useEffect } from "react";
import { Table, Row, Card, Col,Button } from "react-bootstrap";
import axios from "axios";
import {  FaTrashAlt } from "react-icons/fa";


function ViewFares(props) {
    const [order, setorder] = useState([]);
    const [search, setSearch] = useState("");
    const [count, setcount] = useState("");
    const [totals, settotal] = useState("");
    const [bustrip, setbustripcount] = useState("");

    let tot=0;
    
    useEffect(() => {

        //get funtion
        function getorder() {
            axios.get("http://localhost:8070/passenger/").then((res) => {
                setorder(res.data);
                setcount(res.data.length);
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
                setbustripcount(res.data.length);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getbus();
        getorder();
    }, [])

    function onDelete(_id) {
        console.log(_id);
        axios.delete("http://localhost:8070/passenger/" + _id).then((res) => {
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
            <div style={{ paddingLeft: '1vh', paddingRight: '7vh', paddingTop: '3vh', paddingBottom: '4vh' }}>
                <Card border="secondary">
                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "1vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ paddingLeft: "40%", paddingBottom: "2vh" }}>Total Sheduled Data</h1>

                            

                            <div style={{ paddingleft: "5vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

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
                                        <th>Route No</th>
                                        <th>Bus No</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Total</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {order.filter(Order => {
                                        if (search === "") {
                                            return Order
                                        }
                                        else if (Order.busno.toLowerCase().includes(search.toLowerCase())) {
                                            return Order
                                        }
                                    }).
                                        map((Order) => {

                                            return (
                                                <tr key={Order._id}>
                                                    <td>{Order.busno}</td>
                                                    <td>{Order.busno}</td>
                                                    <td>{Order.date}</td>
                                                    <td>{Order.time}</td>
                                                    <td>{Order.total}</td>
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
                <Row>
                    <Col>
                    <Card style={{ width: '20rem' }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                        Total Number Of Shedules: {count}<br />
                                        </div>
                                    </Card>
                                    </Col>
                    <Col>
                    <Card style={{ width: '20rem' }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                        Total Buses: {bustrip}<br />
                                        </div>
                                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '20rem' }}>
                                    <div style={{ paddingBottom: '2vh', paddingTop: '1vh', paddingLeft: '35%' }}>

                                        Total Fine Collected : {totals}<br />
                                        </div>
                                    </Card>
                    </Col>

                </Row>
            </div>
            
        </div>


    );

}
export default ViewFares;



