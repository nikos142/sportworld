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
    nationality:"",
    worth:""
}

module.exports ={ResultObject, factsObject, FixtureObject, TransferObject, PlayerObject}