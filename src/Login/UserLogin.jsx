import React, {useState, createContext, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import "../styles/Login.css"
import {delivery} from "../Pages/dataFetch";



export const UserContext = createContext();

const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}


const UserLogin = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [tocken, setTocken] = useState("");

    useEffect(() => {
        console.log(tocken);
        delivery(tocken);
    }, [tocken]);


    const tryToLogin = (e) =>{
        e.preventDefault()
        try{
            fetch('http://127.0.0.1:9123/user/verify/', {
                method : 'POST',
                headers: header,
                body: JSON.stringify({login: login.value, password: password.value})
            })
                .then((response) =>response.text())
                .then(data => setTocken(data))
        } catch (err) {
            console.log(err)
        }
    }


    return(
         <Form className ="login-form">
             <Form.Group controlId="formGroupLogin">
                 <Form.Label>Login</Form.Label>
                 <Form.Control ref={(input) => setLogin(input)} type="login" placeholder="Enter login" />
             </Form.Group>
             <Form.Group controlId="formGroupPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control ref={(input) => setPassword(input)} type="password" placeholder="Password" />
             </Form.Group>
             <Button onClick={tryToLogin} className="btn-lg btn-block" variant="primary">Log in</Button>{' '}
         </Form>
    )
}


export default UserLogin;