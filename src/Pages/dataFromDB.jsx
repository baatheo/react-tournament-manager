import * as React from "react";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getAllTeams, getMatches, getTournaments} from "./dataFetch";
import "../styles/style1.css"

const tempTeams = [{nazwa:"Pierwsza"},{nazwa:"Druga"},{nazwa:"Trzecia"},{nazwa:"Czwarta"}]


export class GetTeams extends React.Component{


    state ={
        tournaments : []
    }

    getTeams(){
        let tempTours = getTournaments();
        this.setState({
            tournaments: tempTours
        })
    }

    render(){
        return(
            <div>
                <TeamList teams={this.state.tournaments}/>
                <Button variant="success" onClick={()=>{this.getTeams()}} type="submit">Pobierz Turnieje</Button>
            </div>
        )
    }

}

const TeamList  = ({teams}) =>{
    if(teams.length > 0){
        return(
            <div>
                <ListGroup as="ul" className="color-list">
                    {teams.map(team => <ListGroup.Item as="li"  className="color-list">{team.name}</ListGroup.Item> )}
                </ListGroup>
            </div>
        );
    } else return(
      <p>Brak wyników!</p>
    );
}
