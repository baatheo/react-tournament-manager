import React, {useContext, useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {FormToAddTeam, FormToAddTournament} from "./Form";
import "../styles/style1.css"
import {GetTeams} from "./dataFromDB";
import {InsertScore} from "./Matches";
import {deleteAll} from "./dataFetch";
import {GetScore} from "./getScore";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Kontakt} from "./Kontakt";
import UserLogin, {UserContext} from "../Login/UserLogin"

class NavyBar extends React.Component{
    render(){
        return(
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="home">Menedżer Turniejowy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/link">Kontakt</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Szukaj" className="mr-sm-2" />
                            <Button onClick ={deleteAll}  variant="outline-danger">Usuń baze danych</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

class MiddleLayout extends React.Component{
    render(){
        return(
            <div class="card text-black-50 bg-light">
                <div className="card-body">
                    <FormToAddTournament/>
                    {/*<InsertScore/>*/}
                </div>
            </div>
        );
    }
}

class LeftLayout extends React.Component{
    render(){
        return(
            <div className="card text-black-50 bg-light">
                <div className="card-body">
                    <GetScore/>
                </div>
            </div>
        );
    }
}

class RightLayout extends React.Component{
    render(){
        return(
            <div className="card text-black-50 bg-light">
                <div className="card-body">
                    <h5>Drużyny z serwera</h5>
                    <GetTeams/>
                </div>
            </div>
        );
    }
}

const Layout = () => {
    // const [tocken, setTocken] = useState("");
    const tocken = useContext(UserContext);

    return(
        <div className="row">
            <div className="col-2  rounded-top">
                <LeftLayout/>
            </div>
            <div className="col-8 rounded-top">
                <MiddleLayout/>
            </div>
            <div className="col-2 rounded-top">
                <RightLayout/>
            </div>
            {tocken}
            {console.log(`tocken z Layout ${tocken}`)}
        </div>
    );
}


class Footer extends React.Component{
    render(){
        return(
            <div className="fixed-bottom footer">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Projekt Zespołowy wykonany przez Bartosza Porębskiego oraz Jakuba Florczaka</Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}




export class MainPage extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <NavyBar/>
                    <Switch>
                        <Route path='/login' component={UserLogin}/>
                        <Route path='/home' component={Layout}/>
                        <Route path='/link' component={Kontakt}/>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}
