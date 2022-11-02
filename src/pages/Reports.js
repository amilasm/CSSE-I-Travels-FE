import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
export default function Reports() {
    const [bustrip, setbustrip] = useState([]);

    useEffect(() => {

        //get bus details funtion
        function getbus() {
            axios.get("http://localhost:8070/bustrip/").then((res) => {
                setbustrip(res.data);
                console.log(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }

      
        getbus();
    }, [])


    const generateorderReport = () => {
        const doc = new jsPDF();
        const title = "Bus Routes Data Summary";
        doc.setFontSize(15);
        doc.setTextColor(128, 0, 0);
        doc.text(title, 100, 10, null, null, "center");
        doc.setTextColor(0);
        doc.setFontSize(12);

        doc.setFontSize(8);
        doc.text(
            `*This Report is automatically generated.`,
            20,
            35,
            null,
            null
        );

        const headers = [
            [
                "Bus No",
                "Route No",
                "Capacity",
                "Type",
                "Root Type",
                "Time",
                "From",
                "To",
                "No Of Bus",
                "Price",
                "Status",
            ],
        ];

        const data = bustrip.map((bustrip, index) => [
            index,
           bustrip.busno,
           bustrip.routeno,
            bustrip.capacity,
           bustrip.type,
            bustrip.roottype,
            bustrip.time,
            bustrip.from,
            bustrip.to,
            bustrip.noofbus,
           bustrip.price,
          bustrip.status

        ]);
        let contents = {
            startY: 20,
            head: headers,
            body: data,
        };
        doc.autoTable(contents);
        doc.save("Bus_Data_Report.pdf");
    };



    return (
        <div>
            <div style={{ paddingLeft: '1vh' }} >
                
                <center><h1>Reports</h1></center>
                <div style={{ paddingLeft: '3vh', paddingTop: '5vh' }}>
                    <Row>
                        <Col>
                        <Card style={{ width: '30rem'}}>
                                    <img src="https://cdn.dribbble.com/users/2101543/screenshots/4733590/busem_przez_swiat.gif"/>
                                </Card>
                        </Col>
                        <Col>
                        <div>
                            <button type="button"
                                id="downloadBtn"
                                onClick={() => generateorderReport()}>
                                <Card style={{ width: '30rem', height: '20rem', background: '#f01e2c' }}>
                                    <div style={{ paddingTop: '7rem' }}>

                                        <h1 style={{ color: 'white' }}>(PDF) Download Bus Trip Details Report</h1>
                                    </div>
                                </Card>
                            </button>
                            </div>
                        </Col>
                       
                    </Row>
                </div>

            </div>
        </div>
    );
}