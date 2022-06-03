const mysql= require('mysql2')


const connection =  mysql.createPool({
  host:"localhost",
  user: "root",
  password: "",
  database: "sportuniversedb"
  });
  
const promisePool = connection.promise();

/******************  USERS  ******************/ 
async function getUserByEmail(email){
let sql = "Select * from users where email=?"
const [rows, fields] = await promisePool.execute(sql, [email]);
return rows;
}

async function getUserById(id){
  let sql = "Select * from users where id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
}

async function insertUser(email , pswd){
  let sql = "Insert into  users (email, password) values (?,?)"
  const [rows, fields] = await promisePool.execute(sql, [email, pswd]);
  return rows;
}

async function updateUserToken(token , id){
    let sql = "Update users SET token = ? WHERE id = ?"
    const [rows, fields] = await promisePool.execute(sql, [token , id]);
    return rows;
}

/***************  FOOTBALL  ********************/
async function getLeagueTeams(id)  {
  let sql = "Select * from football_teams where league_id= ? order by points desc;"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
};

async function getTeamsRoster(id) {
 let sql = "Select * from football_players where team_id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
};

async function getTeamsProfile(id) {
 let sql = "Select * from football_teams_profiles inner join football_coaches on coach_id=football_coaches.id where team_id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
};

async function getTeamsMatches(id) {
  let sql = "Select * from football_matches where home_team_id= ? Or away_team_id= ?"
  const [rows, fields] = await promisePool.execute(sql, [id, id]);
  return rows;
}

async function getTeamStatsByLeague(id){
  let sql ="SELECT team_id, yellow_cards, red_cards, ( goals_home + goals_away) as goals , (conceded_home + conceded_away) as conceded from football_team_stats where team_id in (SELECT id FROM `football_teams` where league_id=?)"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function checkTeamsStatline(id){
  let sql = "Select team_id  from football_team_stats where  team_id=? and season=2022"
  const [rows, fields2] = await promisePool.execute(sql, [id])

  if(rows[0]==undefined)
  {
    let sql ="Insert into football_team_stats(team_id, season) values (?,?)";
    const [rows, fields] = await promisePool.execute(sql, [id , 2022])
    return rows
  }
}

async function getHomegoals(id)
{
  let sql = "Select SUM(home_team_score) as homegoals ,SUM(away_team_score) as concededhome from football_matches where home_team_id=? and done=1"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getAwaygoals(id)
{
  let sql = "Select SUM(away_team_score) as awaygoals, SUM(home_team_score) as concededaway from football_matches where away_team_id=? and done=1"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getCards(id)
{
  let sql = "SELECT SUM(yellow_cards) as yellows , SUM(red_cards) as reds  FROM `football_player_stats` where player_id in (Select id from football_players where team_id=?)"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function checkPlayersStatline(id)
{
  let sql = "Select player_id from football_player_stats where player_id =?"
  const [row, fields] = await promisePool.execute(sql, [id])
  if(row[0]== undefined)
  {
   let sql= `Insert into football_player_stats (player_id, goals, owngoals, yellow_cards , red_cards, season) values( ? ,0 ,0, 0 , 0, 2022) `;
   const [row, fields] = await promisePool.execute(sql, [id])
    return row
  }
}
async function getMatchScore(id)   {
 let sql = "Select home_team_score , away_team_score from football_matches where id=?";
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
}

async function getTeamById(id)  {
  let sql = "Select name from football_teams where id=?";
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].name;
}

async function getLeagueById(id)  {
  let sql = "Select name from football_leagues where id=?";
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].name;
}

async function getLeague(league) {
 let sql = 'Select id from football_leagues where reference=?';
  const [rows, fields] = await promisePool.execute(sql, [league]);
  return rows[0].id;
}

async function getRules(id)  {
let sql = "SELECT * FROM rules  WHERE id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows;
}
  
async function getTransfers(id)  {
  let sql = "SELECT * FROM transfers   WHERE from_team= ? OR to_team=?"
  const [rows, fields] = await promisePool.execute(sql, [id, id]);
  return rows;
}

async function getPlayer(id)  {
  let sql = "SELECT * FROM football_players  WHERE  id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0]
}
async function getFacts(id){
  let sql = "SELECT * FROM football_match_facts  WHERE  match_id=? order by minute ASC"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getTeamsIds(where){
  let sql = "Select distinct "+where+"_team_id from football_matches"
  const [rows, fields] = await promisePool.execute(sql)
  return rows
}

async function getMatchLineups(id){
  let sql = "SELECT lineups FROM football_matches  WHERE id=? "
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getScorer(id) {
  let sql = "SELECT fname , lname, team_id FROM football_players  WHERE  id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getMatchFacts(){
  let sql = "Select id, player_id, type from football_match_facts where extracted = 0";
  const [rows, fields] = await promisePool.execute(sql)
  return rows
}

async function updatePlayerStatline(type , id ){
  let updsql="Update football_player_stats set "
  if(type == "goal")
  {
     updsql = updsql + "goals= goals +1 ";
  }
  if(type == "yellow card")
  {
     updsql =updsql+ "yellow_cards=yellow_cards +1 ";
  }
  if(type == "red card")
  {
     updsql = updsql+ "red_cards=red_cards +1 ";
  }
  if(type == "owngoal")
  {
     updsql = updsql+ "owngoals=owngoals +1 ";
  } 
  updsql= updsql+"where player_id=?"
  const [row, fields] = await promisePool.execute(updsql, [id])
}

async function updateMatchFactStatus(id){
    let sql = "Update football_match_facts set extracted=1 where id=?";
    const [row, field] = await promisePool.execute(sql, [id])
    return row
}

async function updateTeamStatline(home , away ,conhome , conaway, yellows, reds,  id){
  let sql = "Update football_team_stats set goals_home=? ,goals_away=? , conceded_home=? , conceded_away=? , yellow_cards=? , red_cards=?  WHERE team_id=?"
  const [row, fields] = await promisePool.execute(sql, [home , away, conhome , conaway, yellows, reds,  id])
  return row
}

/***************  TENNIS  ******************/
async function getAtpRanking(gender)  {
  let sql = "SELECT * FROM tennis_players WHERE gender=? order by points DESC"
  const [rows, fields] = await promisePool.execute(sql, [gender]);
  return rows
}

async function getTennisPlayer(id)  {
  let sql = "SELECT * FROM tennis_players WHERE id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getTennisPlayerName(id)  {
  let sql = "SELECT fname, lname FROM tennis_players WHERE id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].fname+" "+rows[0].lname
}

async function getAtpTournaments()  {
  let sql = "SELECT * FROM `atp_tour`"
  const [rows, fields] = await promisePool.execute(sql);
  return rows
}

async function getMatchesByTournament(id)  {
  let sql = "SELECT * FROM tennis_matches  WHERE tour_id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getTournament(id)  {
  let sql = "SELECT name  FROM atp_tour  WHERE id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].name
}

async function getPlayersMatches(id)  {
  let sql = "SELECT * FROM tennis_matches  WHERE player1_id=? OR player2_id=? order by date DESC"
  const [rows, fields] = await promisePool.execute(sql, [id, id]);
  return rows
}

/***************  FORMUAL 1  ******************/
async function getDriversRanking()  {
  let sql = "SELECT id, fname , lname , active, points FROM formula1_drivers WHERE active=1  order by points DESC"
  const [rows, fields] = await promisePool.execute(sql);
  return rows
}

async function getTeamsRanking()  {
  let sql = "SELECT id,  name, points  FROM formula1_teams order by points DESC"
  const [rows, fields] = await promisePool.execute(sql);
  return rows
}

async function getDriverById(id)  {
  let sql = "SELECT * FROM formula1_drivers WHERE id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows
}

async function getDriversTeam(id)  {
  let sql = "SELECT name  FROM formula1_teams where id=?"
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].name
}

module.exports={ updateUserToken, getUserById, getUserByEmail,insertUser, getDriversTeam, getDriverById, getDriversRanking, getTeamsRanking, getTennisPlayer,getTennisPlayerName, 
                getPlayersMatches, getMatchesByTournament, getAtpTournaments,getAtpRanking, getTournament,
                getTransfers,getScorer, getFacts , getPlayer, getRules, getHomegoals, getAwaygoals, updateTeamStatline, getCards,
                getTeamsProfile, getTeamsMatches , getMatchScore, getTeamById,getMatchLineups, checkTeamsStatline,checkPlayersStatline,
                updatePlayerStatline,updateMatchFactStatus, getMatchFacts, getTeamStatsByLeague,
                getLeagueById, getLeague ,getTeamsIds, getLeagueTeams, getTeamsRoster}