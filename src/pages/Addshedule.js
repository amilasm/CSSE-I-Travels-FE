import React, { useState } from "react"

import { Card, Button,  Form } from 'react-bootstrap';
import axios from "axios";


export default function Addshedule() {
  const [busno, setbusno] = useState("");
  const [routeno, setrouteno] = useState("");
  const [capacity, setcapacity] = useState(" ");
  const [type, settype] = useState(" ");
  const [roottype, setroottype] = useState(" ");
  const [time, settime] = useState(" ");
  const [status, setstatus] = useState(" ");
  const [from, setfrom] = useState(" ");
  const [to, setto] = useState(" ");
  const [noofbus, setnoofbus] = useState(" ");
  const [price, setprice] = useState(" ");

  function sendData(e) {


    e.preventDefault();

    const newProducr = {
      busno,
      routeno,
      capacity,
      type,
      roottype,
      time, status, from, to, noofbus, price
    }

    axios.post("http://localhost:8070/bustrip/", newProducr).then(() => {
      ("bus added")
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

      alert("Shedule added ..");
      window.location = './viewshedule'

    }).catch((err) => {
      alert("error");
    })
  }
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <br/><br/><br/>
      <div style={{ paddingLeft: '5vh', paddingTop: '1vh', paddingBottom: '5vh', paddingRight: '5vh',boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)" }}>
      <center>
        <h1 style={{fontWeight:"bold",paddingTop: "2vh"}}>Create Shedule</h1>
        <hr></hr>
        </center>


            <Form onSubmit={sendData}>

              <br />
              <div >

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Route No:</Form.Label>
                  <Form.Control type="text" name='Routeno'
                    onChange={(e) => setrouteno(e.target.value)}
                    placeholder=" Enter Route No"  required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label >Start: </Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setfrom(e.target.value)}

                    placeholder="Start" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label >End: </Form.Label>
                  <Form.Control type="text"
                    onChange={(e) => setto(e.target.value)}

                    placeholder="End"  required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label >Time : </Form.Label>
                  <Form.Control type="time"
                    onChange={(e) => settime(e.target.value)}
                    placeholder=" Time" required/>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label >No Of Buses: </Form.Label>
                  <Form.Control type="number"
                    onChange={(e) => setnoofbus(e.target.value)}

                    placeholder=" Enter No Of Buses"  required/>
                </Form.Group>
              </div>
              <br/>
              <div style={{ paddingLeft: "40%" }}>
                <Button type="submit" variant="primary">Add Shedule</Button>{' '} {' '}
                <Button variant="dark" onClick={refreshPage}>Reset</Button>

              </div>
            </Form>
      </div>


    </div>
  );
}
