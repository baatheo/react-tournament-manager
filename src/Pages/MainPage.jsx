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
import LoginBox from "../Login/UserLogin";


const NavyBar = () => {
    const [isLoged, setIsLoged] = useState(false);
    const {token, setToken} = useContext(UserContext);

    useEffect(() =>{
        if(token !== ""){
            setIsLoged(true);
        }
        else{
            setIsLoged(false)
        }
    })

    const doLogout = () => {
        console.log(`doLogout token "${token}"`)
        if(token !== ""){
            setToken("");
            setIsLoged(false);
            console.log(token);
        }
    }

        return(
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="home">Menedżer Turniejowy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/link">Kontakt</Nav.Link>
                        </Nav>
                        <Form inline>
                            {console.log(`token z navbar: ${token}`)}
                            {console.log(`isLoged ${isLoged}`)}
                            {!isLoged && <Nav.Link href="/login">Login</Nav.Link>}
                            {isLoged && <Button variant="outline-primary" onClick={doLogout}>Logout</Button>}
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )

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




export const MainPage = () => {
        const [token, setToken] = useState("");


        return(
            <UserContext.Provider value={{token, setToken}}>
                {console.log(`MainPage token from provider ${token}`)}
                <BrowserRouter>
                    <div>
                        <NavyBar/>
                        <Switch>
                            <Route path='/login' component={LoginBox}/>
                            <Route path='/home' component={Layout}/>
                            <Route path='/link' component={Kontakt}/>
                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </UserContext.Provider>
        )
}
