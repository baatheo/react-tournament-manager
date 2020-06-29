import React, {useState, createContext, useEffect, useContext} from "react";
import {Form, Button} from "react-bootstrap";
import "../styles/Login.css"


export const UserContext = createContext();

const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
}


const LoginBox = () => {
    const [isLoginClicked, setIsLoginClicked] = useState(true);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);

    const showRegister = () => {
        setIsLoginClicked(false);
        setIsRegisterClicked(true);
    }
    const showLogin = () => {
        setIsLoginClicked(true);
        setIsRegisterClicked(false);
    }



    return(
        <div className="root-container">
            <div className="box-controller">
                <div className={"controller" + (isLoginClicked ? " selected-controller" : "")} onClick={() => {showLogin()}}>
                    Login
                </div>
                <div className={"controller" + (isRegisterClicked ? " selected-controller" : "")} onClick={() => {showRegister()}}>
                    Register
                </div>
            </div>
            <div className="box-container">
                {isLoginClicked && <UserLogin/>}
                {isRegisterClicked && <UserRegister/>}
            </div>
        </div>
    )
}


const UserLogin = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {token, setToken} = useContext(UserContext);

    useEffect(() => {
        console.log(`useEffect token: ${token}`)
    }, [token]);


    const tryToLogin = (e) =>{
        e.preventDefault()
        try{
            fetch('http://127.0.0.1:9123/user/verify', {
                method : 'POST',
                body: JSON.stringify({login: login.value, password: password.value}),
                headers: header
            })
                .then((response) =>response.text())
                .then(data => setToken(data))
        } catch (err) {
            console.log(err)
        }
    }


    return(
        <div>
            <div className='header'>
                <div className="center">Login</div>
            </div>
            <Form className ="login-form">
                <Form.Group controlId="formGroupLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control ref={(input) => setLogin(input)} type="login" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={(input) => setPassword(input)} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={tryToLogin} className="btn-lg btn-block" variant="primary">Log in</Button>{' '}
            </Form>
        </div>
    )
}

const UserRegister = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        console.log(`registered state: ${registered}`)
    }, [registered]);


    const tryToRegister = (e) =>{
        e.preventDefault()

    }


    return(
        <div>
            <div className='header'>
                <div className="center">Register</div>
            </div>
            <Form className ="login-form">
                <Form.Group controlId="formGroupLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control ref={(input) => setLogin(input)} type="login" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={(input) => setPassword(input)} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={tryToRegister} className="btn-lg btn-block" variant="primary">Register</Button>{' '}
            </Form>
        </div>
    )
}


export default LoginBox;