const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const database = require("./database.js")
const {matchObject, factsObject, transferObject, tennisMatchObject} = require("./objects/matchObject")



app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  next();
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

/***************  FOOTBALL  ******************* */

app.get("/:league", async (req, res) => {
      var league=req.params.league
      console.log(league+" teams requested")
      try
      {
        var league_id =await database.getLeague(league)
        var teams =await database.getLeagueTeams(league_id)
      }
        catch(error)
        {
          console.log(error)
        }
        res.send(teams)
  })

  app.get("/matches/:id", async (req, res) => {
    var id=req.params.id
    try{
     const matches= await  database.getTeamsMatches(id)
     var tempmatches=[]
     for(i in matches){
       const obj =Object.create(matchObject)
         obj.id=matches[i].id
         obj.league= await database.getLeagueById(matches[i].league_id)
         obj.home_team= await database.getTeamById(matches[i].home_team_id)
         obj.away_team= await database.getTeamById(matches[i].away_team_id)
         obj.done=matches[i].done
         var date=new Date(matches[i].date)
         obj.date = date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear()
         var minutes=date.getMinutes()
         if(minutes<10){
             minutes="0"+minutes
         }
         obj.time=date.getHours()+":"+minutes
         if(matches[i].done==1)
         {
            var score  = await database.getMatchScore(matches[i].id)
            obj.home_team_score = score[0].home_team_score
            obj.away_team_score = score[0].away_team_score
            var facts= await database.getMatchFacts(matches[i].id)
            var tempfacts=[]
           for( j in facts )
            {  
              const obj2 = Object.create(factsObject)
              obj2.id = facts[j].id
              obj2.match_id = facts[j].match_id
              var player = await database.getScorer(facts[j].player_id)
              obj2.team= await database.getTeamById(player[0].team_id)
              obj2.player=player[0].fname+" "+player[0].lname
              obj2.minute=facts[j].minute
              obj2.type=facts[j].type
              tempfacts.push(obj2)
            }  
         }
           obj.facts = tempfacts
           tempmatches.push(obj)
        }
            res.send(tempmatches)
          }
          catch(error)
          {
            console.log(error)
          }  
    })

  app.get("/profile/:id", async (req, res) => {
        var id=req.params.id
        try{
              var profile= await database.getTeamsProfile(id);
          }
          catch(error)
          {
            console.log(error)
          }
          res.send(profile)
    })

    app.get("/players/:id" , async (req, res) => {
      var id=req.params.id
      try{
        var players= await database.getTeamsRoster(id)
          }
          catch(error)
          {
            console.log(error)
          }
          res.send(players)
     })
     
     app.get("/player/:id" , async (req, res) => {
      var id=req.params.id
      try{
        var player= await database.getPlayer(id)
          }
          catch(error)
          {
            console.log(error)
          }
          res.send(player)
     })

 app.get("/rules/:id", async (req, res) => {
      var id=req.params.id
      try{
        var rules =await database.getRules(id)
      }
      catch(error)
      {
        console.log(error)
      }
      res.send(rules)
 })
 
 app.get("/transfers/:id", async (req, res) =>
 {
   var id=req.params.id
  
   try{
      var transfers =await database.getTransfers(id)
      var data = []
        for(i in transfers)
        {
          const obj= Object.create(transferObject)
          obj.id=transfers[i].id
          obj.fee=transfers[i].fee
          var date=new Date(transfers[i].date)
          obj.date = date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear()
          var player = await database.getPlayer(transfers[i].player_id)
          obj.player = player.fname+" "+player.lname 
          obj.from = await database.getTeamById(transfers[i].from_team)
          obj.to =await database.getTeamById(transfers[i].to_team)
          data.push(obj)
        }
      }
      catch(error)
      {
        console.log(error)
      }
      res.send(data)
 })

/***************  TENNIS  ******************/
app.get("/tennis/ranking", async (req, res) =>
{
  try{
   var atpdata= await database.getAtpRanking("male")
   var watpdata = await database.getAtpRanking("female")
  }
  catch(error)
  {
    console.log(error)
  }
  res.send({atp:atpdata, watp:watpdata})
})

app.get("/tennis/profile/:id", async (req, res) =>
{
  var id=req.params.id
  try{
   var data= await database.getTennisPlayer(id)
   var tempmatches = await database.getPlayersMatches(id)
   var matches=[]
   for (i in tempmatches)
   {
     const obj=Object.create(tennisMatchObject)
     obj.id=tempmatches[i].id
     obj.date=tempmatches[i].date
     obj.done=tempmatches[i].done
     obj.tour= await database.getTournament(tempmatches[i].tour_id)
     obj.player1= await database.getTennisPlayerName(tempmatches[i].player1_id)
     obj.player2= await database.getTennisPlayerName(tempmatches[i].player2_id)
     obj.player1_sets=tempmatches[i].player1_sets
     obj.player2_sets=tempmatches[i].player2_sets
     var date=new Date(tempmatches[i].date)
     obj.date = date.getDate() +"-"+parseInt(date.getMonth()+1)+"-"+date.getFullYear()
     var minutes=date.getMinutes()
     if(minutes<10){
         minutes="0"+minutes
     }
     obj.time=date.getHours()+":"+minutes
     matches.push(obj)   
   }
  }
  catch(error)
  {
    console.log(error)
  }
  res.send({profile:data , matches:matches})
})


app.get("/tennis/tournaments", async (req, res) =>
{
  try{
   var data= await database.getAtpTournaments()
  }
  catch(error)
  {
    console.log(error)
  }
  res.send(data)
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});