const matchObject = {
    id:"",
    league:"",
    home_team:"",
    away_team:"",
    done:"",
    facts:[],
    home_team_score:"",
    away_team_score:"",
    date:"",
    time:""
}
const footballTeamObject={
    id:"",
    name:"",
    goals: "",
    conceded:"",
    points:"",
    color:"",
    ycards:"",
    rcards:"",
}
const factsObject ={
    id:"",
    match_id:"",
    player:"",
    type:"",
    team:"",
    minute:"",
}

const transferObject={
    id:"",
    player:"",
    from:"",
    to:"",
    fee:"",
    date:""
}

const tennisMatchObject={
    id:"",
    tour:"",
    player1:"",
    player2:"",
    done:"",
    player1_sets:"",
    player2_sets:"",
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
    nationality:""
}

const FormulaTeamObject = {
    id:"",
    name:"",
    country:"",
    headquarters:"",
    principal:"",
    owner:"",
    points:""
}

module.exports ={matchObject, footballTeamObject ,  factsObject,  transferObject , tennisMatchObject, DriverObject, FormulaTeamObject}