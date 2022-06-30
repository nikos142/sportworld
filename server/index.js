require('dotenv/config')
const express = require("express");
const cookieParser = require('cookie-parser')
const cors=require('cors');
const {verify} = require ('jsonwebtoken')
const {hash , compare } = require ('bcryptjs')
const PORT = process.env.PORT
const app = express();
const path = require("path");
const database = require("./database.js")
const  stats= require("./statsController.js")
const transfers = require("./transfersController.js")
const {matchObject, factsObject, transferObject, tennisMatchObject, DriverObject, FormulaTeamObject} = require("./objects/matchObject");
const {createAccessToken, createRefreshToken , sendAccessToken, sendRefreshToken} = require("./tokens.js")
const {isAuth} =require('./isAuth');
app.use(cookieParser());
var cron = require('node-cron');

cron.schedule('0 0 * * * *',  () => {
    stats.updatePlayerStats()
    stats.updateTeamStats()
    console.log("Stats Updated")
});

cron.schedule('0 0 0 * * *',  () => {
    transfers.updateRosters()
    console.log("Rosters Updated")
});


//cookie handling
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials:true,
  })
)


//ability to read body data
app.use(express.json()); //support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); //support Url-encoded bodies

 //REGISTER USERS 
app.post('/register', async (req , res) => {
    const {email, password} = req.body;
     try
     {
      var account = await database.getUserByEmail(email)
      if(account[0]!==undefined){
        var status="User Exists" 
      }
      else{
        const hashedPassword = await hash(password,10) 
        await database.insertUser(email, hashedPassword)
        var status ="user inserted"
      }
     }
     catch(error){
          console.log(error)
     }
     res.send(status)
  })


//  LOGIN USERS
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    var status=""
    if(email!==undefined && password!== undefined)
    {
    try
    {
      var account = await database.getUserByEmail(email)
      if(account[0]===undefined) throw new Error("User does not exist")
       const valid= await compare(password, account[0].password)
       if(!valid) throw new Error("Password is incorrect")
       const accesstoken =  createAccessToken(account[0].id)
       const refreshtoken= createRefreshToken(account[0].id)
       await database.updateUserToken(refreshtoken ,account[0].id)
       sendRefreshToken(res , refreshtoken)
       sendAccessToken(res, req, accesstoken)
          }
    catch(error){
      console.log(error)
    }
  }
  else{
    status = "Username and password are empty"
    res.send(status)
  }
  })


//LOGOUT USERS
app.post('/logout', (req, res) => {
  res.clearCookie('refreshtoken' , {path:'/refresh_token'})
  return res.send({
    message:"Logged out" 
  }) 
})

//ROUTE WITH AUTH
app.post('/protected', async (req, res)=>
{
  try{
    const userId = isAuth(req)
    if(userId!==null){
      res.send({
        data:'this is protected'
      })
    }
  }
  catch(error)
  {
     console.log(error)
     res.send({message:error.message})
  }
})


//GET NEW ACCESTOKEN WITH A REFRESH TOKEN
app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.refreshtoken
  if(!token) return res.send({accesstoken:""})
  let payload=null
  try{
       payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
  }
  catch(error)
  {
     return  res.send({accesstoken: ""})
  }
  //IF WE GET VALID TOKEN  CHECKS USER 
  const user= await database.getUserById(payload.id)
  //IF USER EXISTS  CHECKS IF REFRESH_TOKEN EXISTS FOR USER
  if(!user[0]) return res.send({accesstoken:''})
  if(user[0].token!== token)
  {
    return  res.send({accesstoken:''})
  }
  const accesstoken= createAccessToken(user[0].id)
  const refreshtoken= createRefreshToken(user[0].id)
  await database.updateUserToken(refreshtoken ,user[0].id)
  sendRefreshToken(res, refreshtoken)
   res.send({accesstoken})
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

/***************  FOOTBALL  ********************/
app.get("/football/:league", async (req, res) => {
  var league=req.params.league
  console.log(league+" teams requested")
  try
    {
      var league_id =await database.getLeague(league)
      var stats = await database.getTeamStatsByLeague(league_id)
      for (i in stats){
        var team = await database.getTeamById(stats[i].team_id)
        stats[i].name=team.name
        stats[i].color=team.color
      }  
    }
  catch(error)
    {
      console.log(error)
    }
    res.send({stats})
})

app.get("/football/matches/:id", async (req, res) => {
    var id=req.params.id
    try{
     const matches= await  database.getTeamsMatches(id)
     var tempmatches=[]
     for(i in matches){
       const obj =Object.create(matchObject)
         obj.id=matches[i].id
         obj.league= await database.getLeagueById(matches[i].league_id)
         var teamH= await database.getTeamById(matches[i].home_team_id)
         var teamA = await database.getTeamById(matches[i].away_team_id)
         obj.home_team= teamH.name
         obj.away_team= teamA.name
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
            var facts= await database.getFacts(matches[i].id)
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

app.get("/football/match/details/:id", async (req, res) => {
  var id=req.params.id
  try{
  var match = await database.getMatchById(id)
  var away=JSON.stringify(match[0].lineups.away)
  var home=JSON.stringify(match[0].lineups.home)
  var arr =Array.from(away.split(","))
  var arr2 =Array.from(home.split(","))
  var firsthome = arr2[0].split("[")
  arr2[0]= firsthome[1]
  var firstaway=arr[0].split("[")
  arr[0]= firstaway[1]
  var lasthome = arr2[arr2.length-1].split("]")
  arr2[arr2.length-1]= lasthome[0]
  var lastaway =arr[arr.length-1].split("]")
  arr[arr.length-1] = lastaway[0]
  var playersaway=[]
  var playershome=[]
  for(i in arr2)
  {  
    var player=await database.getPlayer(arr2[i])
    playershome.push({name:player.fname+" "+player.lname , 
                  position:player.position})
  }
  for(i in arr)
  {
    var player=await database.getPlayer(arr[i])
    playersaway.push({name:player.fname+" "+player.lname , 
                  position:player.position})
  }
  var teams=[]
  var hometeam=await database.getTeamById(match[0].home_team_id)
  var awayteam=await database.getTeamById(match[0].away_team_id)
  var score= []
  score.push({home:match[0].home_team_score})
  score.push({away:match[0].away_team_score})
   teams.push({id:match[0].home_team_id,name:hometeam.name,color:hometeam.color})
   teams.push({id:match[0].away_team_id,name:awayteam.name,color:awayteam.color})
  }
  catch(error)
  {
    console.log(error)
  }
  res.send({home:playershome , away:playersaway, teams:teams, score:score})
})

app.get("/football/team/profile/:id", async (req, res) => {
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

app.get("/football/players/:id" , async (req, res) => {
   var id=req.params.id
   try
      {
        var players= await database.getTeamsRoster(id)
      }
   catch(error)
      {
        console.log(error)
      }
      res.send(players)
})
     
app.get("/football/player/:id" , async (req, res) => {
      var id=req.params.id
      try{
        var player= await database.getPlayer(id)
        var country = await database.getCountryById(player.country_id)
        player.country_id=country.name
        var stats= await database.getPlayerStats(id)
        var worth= await database.getPlayersWorth(id)
        for (i in worth){
          var date=new Date(worth[i].date)
          var year =date.getFullYear()
          worth[i].date=year
        }
          }
          catch(error)
          {
            console.log(error)
          }
          res.send({player:player, stats:stats ,worth:worth })
})

app.get("/football/rules/:id", async (req, res) => {
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
 
app.get("/football/transfers/:id", async (req, res) =>
 {
   var id=req.params.id
  
   try{
      var transfers =await database.getTeamsTransfers(id)
      var data = []
        for(i in transfers)
        {
          const obj= Object.create(transferObject)
          obj.id=transfers[i].id
          obj.fee=transfers[i].fee+".000.000"
          var date=new Date(transfers[i].date)
          obj.date = date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear()
          var player = await database.getPlayer(transfers[i].player_id)
          obj.player = player.fname+" "+player.lname 
          var from= await database.getTeamById(transfers[i].from_team)
          obj.from = from.name
          var to =await database.getTeamById(transfers[i].to_team)
          obj.to = to.name
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
   var country =await database.getCountryById(data[0].country_id)
   data[0].country_id=country.name
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


app.get("/tennis/match/details/:id", async (req, res) =>
{
  var id=req.params.id
  try{
   var data= await database.getTennisMatchDetails(id)
   console.log(data)
  }
  catch(error)
  {
    console.log(error)
  }
  res.send(data)
})


/***************  FORMULA 1  ******************/
app.get("/formula1/ranking", async (req, res) =>
{
  try{
   var drivers= await database.getDriversRanking()
   var teams = await database.getTeamsRanking()
  }
  catch(error)
  {
    console.log(error)
  }
  res.send({drivers:drivers , teams:teams})
})

app.get("/formula1/races", async (req, res) =>
{
  try{
   var races= await database.getFormula1Races()
  console.log(races[0].standings)
  }
  catch(error)
  {
    console.log(error)
  }
  res.send(races)
})

app.get("/formula1/team/profile/:id", async (req, res) =>{
  var id=req.params.id
  try{
    var team = await database.getFormula1TeamById(id)
    const obj =  Object.create(FormulaTeamObject)
    obj.id=team[0].id
    obj.name=team[0].name
    obj.headquarters=team[0].headquarters
    obj.owner=team[0].owner
    obj.points=team[0].points
    obj.principal=team[0].team_principal
    var country = await database.getCountryById(team[0].country_id)
    obj.country= country.name
    res.send(obj)
  }
  catch(error)
  {
    console.log(error)
  }
})

app.get("/formula1/driver/profile/:id", async (req, res) =>{
  var id=req.params.id
  try
  {
    var driver = await database.getDriverById(id)
    const obj =  Object.create(DriverObject)
    obj.id=id
    obj.name=driver[0].fname +" "+driver[0].lname
    obj.age=driver[0].age
    var country = await database.getCountryById(driver[0].country_id)
    obj.country= country.name
    obj.height=driver[0].height
    obj.weight=driver[0].weight
    obj.points=driver[0].points
    var team = await database.getFormula1TeamById(driver[0].team_id)
    obj.team=team[0].name
    res.send(obj)
  }
  catch(error)
  {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});