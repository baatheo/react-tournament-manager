import React from "react";
import Card from "react-bootstrap/Card";
export const Kontakt = () =>{
    return(
        <>
            <h2 >Contact Us</h2>
            <Card style={{width: '22rem'}}>
                <Card.Body>
                    <Card.Title>Jakub Florczak</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">jakub.z.florczak@student.put.poznan.pl</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card style={{width: '22rem'}}>
                <Card.Body>
                    <Card.Title>Bartosz Proębski</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">bartosz.porebski@student.put.poznan.pl</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    )
}