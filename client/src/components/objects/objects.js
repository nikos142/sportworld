const ResultObject = {
    id:"",
    league:"",
    home_team:"",
    away_team:"",
    score:"",
    date:"",
    time:"",
    facts:[]
}

const factsObject ={
    id:"",
    match_id:"",
    player:"",
    team:"",
    minute:"",
    type:""
}

const FixtureObject = {
    id:"",
    league:"",
    home_team:"",
    away_team:"",
    date:"",
    time:"",
}

const TransferObject = {
    id:"",
    player:"",
    from:"",
    to:"",
    date:"",
    fee:""
}

const PlayerObject = {
    id:"",
    name:"",
    foot:"",
    country:"",
    worth:"",
    position:"",
    age:"",
    height:"",
}

const TennisPlayerObject = {
    id:"",
    name:"",
    age:"",
    hand:"",
    country:"",
    atp_rank:"",
    points:""
}

const TournamentObject = {
    id:"",
    name:"",
    country:"",
    type:"",
    surface:"",
    start:"",
    end:""
}

const TennisMatchObject={
    id:"",
    player1:"",
    player2:"",
    tour:"",
    score:"",
    date:"",
    time:""
}

const DriverObject = {
    id:"",
    name:"",
    age:"",
    height:"",
    weight:"",
    team:"",
    points:"",
    country:""
}

const FormulaTeamObject = {
    id:"",
    name:"",
    country:"",
    principal:"",
    owner:"",
    points:""
}
module.exports ={
                FormulaTeamObject,
                DriverObject,
                TennisMatchObject,
                ResultObject, 
                factsObject, 
                FixtureObject, 
                TransferObject,
                PlayerObject,
                TennisPlayerObject,
                TournamentObject
                }