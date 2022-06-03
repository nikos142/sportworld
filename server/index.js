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
const {matchObject, factsObject, transferObject, tennisMatchObject, DriverObject} = require("./objects/matchObject");
const {createAccessToken, createRefreshToken , sendAccessToken, sendRefreshToken} = require("./tokens.js")
const {isAuth} =require('./isAuth');
app.use(cookieParser());
var cron = require('node-cron');

cron.schedule('0 0 * * * *',  () => {
    stats.updatePlayerStats()
    stats.updateTeamStats()
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

/***************  FOOTBALL  ******************* */
app.get("/football/:league", async (req, res) => {
  var league=req.params.league
  console.log(league+" teams requested")
  try
    {
      var league_id =await database.getLeague(league)
      var teams =await database.getLeagueTeams(league_id)
      var stats = await database.getTeamStatsByLeague(league_id)
    }
  catch(error)
    {
      console.log(error)
    }
    res.send({teams:teams , stats:stats})
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

app.get("/football/match/lineups/:id", async (req, res) => {
  var id=req.params.id
  var lineups = await database.getMatchLineups(id)
  var pid=JSON.stringify(lineups[0].lineups.away)
  var arr= Array.from(pid)
  arr.shift()
  arr.pop()
  var players=[]
  for(i in arr)
  {
    var player=await database.getPlayer(arr[i])
    players.push({name:player.fname+" "+player.lname , 
                  position:player.position})
  }
 res.send(players)
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
          }
          catch(error)
          {
            console.log(error)
          }
          res.send(player)
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
      var transfers =await database.getTransfers(id)
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

app.get("/formula1/driver/profile/:id", async (req, res) =>{
  var id=req.params.id
  try
  {
    var driver = await database.getDriverById(id)
    const obj =  Object.create(DriverObject)
    obj.id=id
    obj.name=driver[0].fname +" "+driver[0].lname
    obj.age=driver[0].age
    obj.nationality=driver[0].nationality
    obj.height=driver[0].height
    obj.weight=driver[0].weight
    obj.points=driver[0].points
    obj.team = await database.getDriversTeam(driver[0].team_id)
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