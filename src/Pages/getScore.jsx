import * as React from "react";
import {getAllTeams, getSortedTeams} from "./dataFetch";
import Button from "react-bootstrap/Button";


export class GetScore extends React.Component{
    state = {
        teams: []
    }

    async getTeams(){
        let tempTeams = await getSortedTeams();
        this.setState({
            teams: tempTeams
        })
    }

    render(){
        return(
            <div>
                <SortedTeamList teams={this.state.teams}/>
                <Button variant="success" onClick={()=>{this.getTeams()}} type="submit">Pobierz Wyniki</Button>
            </div>
        )
    }
}

const SortedTeamList = ({teams}) =>{
    if(teams.length>0) {
        return (
            <div>
                <ol>
                    {teams.map(team => <li>{team.name} - {team.points} pkt.</li>)}
                </ol>
            </div>
        )
    } else{
        return(
            <p>Brak drużyn!</p>
        )
    }
}