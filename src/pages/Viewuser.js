import React, { useState, useEffect } from "react";
import { Table, Row, Card, Col,Button } from "react-bootstrap";
import axios from "axios";
import {  FaTrashAlt } from "react-icons/fa";


function Viewuser(props) {
    const [order, setorder] = useState([]);
    const [search, setSearch] = useState("");
    
    
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
            <div style={{ paddingLeft: '1vh', paddingRight: '7vh', paddingTop: '3vh', paddingBottom: '4vh' }}>
                <Card border="secondary">
                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "1vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ paddingLeft: "40%", paddingBottom: "2vh" }}>Registered Managers</h1>

                            

                            <div style={{ paddingleft: "5vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="Search from 'Name' " className="mr-2"
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
                                        <th>City</th>
                                        <th>postal code</th>
                                        <th>Contact number</th>

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
                                                    <td>{Order.city}</td>
                                                    <td>{Order.postalcode}</td>
                                                    <td>{Order.contact}</td>

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
            
        </div>


    );

}
export default Viewuser;



