const mysql= require('mysql2')



const connection =  mysql.createPool({
  host:"localhost",
  user: "root",
  password: "",
  database: "sportuniversedb"
  });
  
  const promisePool = connection.promise();


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
  let sql = "Select name from leagues where id=?";
  const [rows, fields] = await promisePool.execute(sql, [id]);
  return rows[0].name;
}

async function getLeague(league) {
 let sql = 'Select id from leagues where reference=?';
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
  let sql = "SELECT fname, lname FROM football_players  WHERE  id=?"
   const [rows, fields] = await promisePool.execute(sql, [id]);
        return rows[0].fname+" "+rows[0].lname;
        }

  module.exports={getTransfers,getPlayer, getRules, getTeamsProfile, getTeamsMatches , getMatchScore, getTeamById, getLeagueById, getLeague , getLeagueTeams, getTeamsRoster,}