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
        const title = "Bus Shedule Detail Report";
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
        doc.save("Bus Shedule Detail Report.pdf");
    };



    return (
        <div>
            <div style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)" }} >
                
                <center><h1 style={{fontWeight:"bold", paddingTop:"4vh"}}>Reports</h1>
                <hr></hr>
                <img style={{ paddingTop: "10%" }} src="https://i.postimg.cc/MppMHjXS/ezgif-com-gif-maker-1.gif" />
                        <div>
                            <a type="button"
                                id="downloadBtn"
                                onClick={() => generateorderReport()}>
                                <img style={{ paddingTop: "5%", width:"50%" }} src="https://media.tenor.com/N30lxYthb7UAAAAC/download-now.gif" />
                                <p>(Bus Shedule Detail Report)</p>
                            </a>
                            </div>
                            </center>
            </div>
        </div>
    );
}