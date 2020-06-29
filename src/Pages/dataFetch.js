const serverAddress = 'http://127.0.0.1:9123/';
let allTeams = []


let header = {
    'Content-Type' : 'application/json',
    Authorization: window.localStorage.getItem('token')
}

function getToken(){
    return window.localStorage.getItem('token');
}

export function delivery(token){
    token = 'Bearer '+ token;
    window.localStorage.setItem('token', token);
    window.localStorage.getItem('token');
    console.log(header);
}


export function sendScore(match){
    console.log(match);
    fetch('http://127.0.0.1:9123/api/match', {
        method : 'PUT',
        body: JSON.stringify(match),
        headers: header
    })
}

export function SendTeam(data){
    fetch('http://127.0.0.1:9123/api/team', {
        method: 'POST',
        //mode: 'no-cors',
        body: JSON.stringify(data),
        headers: header
    })
}

export function deleteAll(){
    fetch(serverAddress + "api/delete/all")
        .then(response => {
            console.log("server po usunieciu: " + response);
        })
}

export function setSchedule(tournament){
    return(
        fetch(serverAddress + 'api/match/schedule/name/' + tournament)
    )
}

export function getMatches(){
    let allMatches  = []
    return(
        fetch('http://127.0.0.1:9123/api/match/all')
            .then(response => response.json())
            .then(data => {
                allMatches = data;
                return allMatches;
            })
    )

}


export function getAllTeams() {
    let teams = []
    return(
    fetch("http://127.0.0.1:9123/api/team/all")
        .then(response => response.json())
        .then(data => {
            teams = data;
            return teams;
        })
    )
}

export function getSortedTeams() {
    let teams = []
    return(
        fetch('http://127.0.0.1:9123/api/team/sorted/points' )
            .then(response => response.json())
            .then(data => {
                teams = data;
                return teams;
            })
    )
}

export function getTournaments() {
    let tournaments = []
    console.log(header);
    return(
        fetch("http://127.0.0.1:9123/api/tournament/jwt/", {
            headers: header,
            method: 'GET',
            mode: 'no-cors'
        })
            .then(response => response.json())
            .then(data => {
                tournaments = data;
                return tournaments;
            })
            .catch(error => console.log(error))
    )

}



export function sendTournament(data){
    fetch("http://127.0.0.1:9123/api/tournament/",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
    })
}
