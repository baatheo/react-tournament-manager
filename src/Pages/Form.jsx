import * as React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {SendTeam} from './dataFetch.js';
import "../styles/style1.css"
import {InsertScore} from "./Matches";
import {sendTournament, setSchedule} from "./dataFetch";
import {UserContext} from "../Login/UserLogin";
import {useContext} from "react";

const allTeams = [];
const {token, setToken, name, setName} = useContext(UserContext);

export class FormToAddTournament extends React.Component {

    constructor() {
        super();
        this.state = {
            nameOfTheTournament: "",
            added: false
        }
    }

    displayForm = (e) => {
        e.preventDefault();
        this.setState({
            added: true,
            nameOfTheTournament: this.state.nameOfTheTournament.value
        })
        let newTournament = {
            name: this.state.nameOfTheTournament.value,
            user : {
                login : name
            }
        }
        sendTournament(newTournament);

    }

    AddName = () => {
        return (
            <div>
                <h1 className="text-center">Najpierw podaj nazwę turnieju</h1>
                <Form ref={form => this.form = form}>
                    <Form.Group controlId="nameOfTheTournament">
                        <Form.Label>Podaj nazwę turnieju</Form.Label>
                        <Form.Control ref={input => this.state.nameOfTheTournament = input} type="text"
                                      placeholder="Nazwa turnieju"/>
                    </Form.Group>
                    <Button onClick={this.displayForm} variant="primary" type="submit">Dodaj</Button>
                </Form>
            </div>
        );
    }

    render() {
        return (this.state.added ? <FormToAddTeam name={this.state.nameOfTheTournament}/> : this.AddName());
    }
}

export class FormToAddTeam extends React.Component{

    state = {
        createTournament: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            nameOfTheTeam : "",
            amountOfPlayers : 0,
            teamsToDisplay: allTeams,
            nameOfTheTournament: this.props.name
        }
    }

    async askForSetSchedule(){
        await setSchedule(this.state.nameOfTheTournament);
        this.setState({
            createTournament: true
        })
    }

    displayScores = () => {
        this.askForSetSchedule()
    }

    deleteTeams = (e) =>{
        e.preventDefault();
        allTeams.splice(0,allTeams.length);
        const teamsToDisplay = allTeams;
        this.setState({
            teamsToDisplay
        })
    }

    addTeams = () =>{
        return(
            <div>
                <h1 className="text-center color-name-tournament">{this.props.name}</h1>
                <h2 className="text-center">Dodaj drużynę do turnieju</h2>
                <div>
                    <Form ref={form => this.form = form}>
                        <Form.Row>
                            <Form.Group as={Col} controlId = "nameOfTheTeam">
                                <Form.Label>Podaj nazwę drużyny</Form.Label>
                                <Form.Control ref={input =>this.state.nameOfTheTeam = input} type="text" placeholder="Nazwa drużyny"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId = "amountOfPeople">
                                <Form.Label>Podaj ilość graczy</Form.Label>
                                <Form.Control ref={input =>this.state.amountOfPlayers = input} type="number" placeholder="Ilość graczy"/>
                            </Form.Group>
                        </Form.Row>
                        <Button onClick={this.addAndSendTeam} variant="primary" type="submit">Dodaj</Button>
                        <Button onClick={this.deleteTeams} variant="danger" type="submit">Wyczyść</Button>
                    </Form>
                </div>
                <div>
                    <TeamList teams={allTeams}/>
                </div>
                <div>
                    <Button onClick={this.displayScores} variant="primary" type="submit">Utwórz Turniej</Button>
                </div>
            </div>
        )
    }

    addAndSendTeam = (e) =>{
        e.preventDefault();
        let newTeam ={
            name: this.state.nameOfTheTeam.value,
            amount: this.state.amountOfPlayers.value
        }
        let bigTeam = {
            name: this.state.nameOfTheTeam.value,
            amountOfPlayers: this.state.amountOfPlayers.value,
            tournament: {
                name: this.state.nameOfTheTournament
            }

        }
        allTeams.push(newTeam);
        const teamsToDisplay = allTeams;
        this.setState({
            teamsToDisplay
        })
        SendTeam(bigTeam);
        this.form.reset();
    }


    render(){
        return(this.state.createTournament ? <InsertScore/> : this.addTeams());
    }
}

export class DisplayTeams extends React.Component{
    constructor() {
        super();
        this.state = {
            teamsToDisplay: allTeams
        };
    }

    render(){
        return(
            <div>
                <TeamList teams={allTeams}/>
            </div>
        )
    }
}



const TeamList = ({teams}) => {
    if (teams.length > 0) {
        return (
            <Table striped bordered hover variant="light">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nazwa drużyny</th>
                    <th>Ilość graczy</th>
                </tr>
                </thead>
                <tbody>
                    {teams.map((team,index) =>
                        <tr><td>{index+1}</td><td>{team.name}</td><td>{team.amount}</td></tr>)}
                </tbody>
            </Table>

        );
    }
    else return(
        <p>Brak wyników</p>
    );
}


