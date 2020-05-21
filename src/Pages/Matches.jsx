import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import {getMatches, sendScore} from "./dataFetch";
import {Button, FormLabel} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "../styles/style1.css"


export class InsertScore extends React.Component {
    state = {
        matches: []
    }

    async getData(){
        let tempMatches = await getMatches();
        this.setState({
            matches: tempMatches
        })
    }

    componentDidMount() {
        this.getData();
    }

    render(){
        const matches = this.state.matches;
        return(
            <div>
            {(matches !== undefined ?
                    <ListGroup as="ul">
                        {matches.map((mecz,index) =>
                            <ListGroup.Item as="li">
                                <MatchScore id1={index+1} id2={index+2}
                                            name1={mecz.firstTeam.name}
                                            name2={mecz.secondTeam.name}
                                            match = {mecz}
                                />
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    : <p>no results!</p>)
            }
            </div>
        )
    }
}

class MatchScore extends React.Component{

    state = {
        score : "",
        sended : false,
        buttonDisable : false
    }

    addAndSendScore = (e) => {
        e.preventDefault();
        let insertedMatch = this.props.match;
        insertedMatch.score = this.state.score.value;
        this.setState({
            buttonDisable : true
        })
        sendScore(insertedMatch)
    }



    addScore = () => {
        console.log(this.props.match);
        console.log(this.props.match.score);
        return(
            <div>
                <Form>
                    <Form.Row >

                    {/*<div className="row">*/}
                        <div className="col-md-4 col-sm-2 text-right">
                            {this.props.name1}
                        </div>
                        <div className="col-md-3 col-sm-2">
                            <Form.Control  size="sm" ref={input =>this.state.score = input} type="text" placeholder="Podaj wynik"/>
                        </div>
                        <div className="col-md-2 col-sm-2">
                            {this.props.name2}
                        </div>
                        <div className="col-md-2 buttonScore">
                            <Button size="sm" disabled={this.state.buttonDisable} onClick={this.addAndSendScore} variant="secondary" type="submit">Wyślij</Button>
                        </div>
                    </Form.Row>
                </Form>
            </div>
        )
    }

    render(){
        return(this.addScore())
    }
}


