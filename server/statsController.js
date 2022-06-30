const database= require('./database.js')

async function updateTeamStats(){
  var ids1 =await  database.getTeamsIds("home")
  var ids2 =await  database.getTeamsIds("away")
  var teamids=[]
  for ( i in ids1)
  {
   teamids.push(ids1[i].home_team_id)
  }
  for (i in ids2)
  {
      if (teamids.indexOf(ids2[i].away_team_id)==-1)
      {
          teamids.push(ids2[i].away_team_id)
      }
  }

  for (i in teamids)
  {
     var check =await database.checkTeamsStatline(teamids[i])
     var  homegoals= await database.getHomegoals(teamids[i])
     var  awaygoals= await database.getAwaygoals(teamids[i])
     var cards= await database.getCards(teamids[i])
     var away= awaygoals[0].awaygoals
     var home= homegoals[0].homegoals
     var conhome=homegoals[0].concededhome
     var conaway = awaygoals[0].concededaway
     var yellows=cards[0].yellows
     var reds = cards[0].reds
     if(yellows== null){
         yellows=0;
     }
     if(reds== null){
         reds=0;
     }
     if(home== null){
         home=0
     }
     if(away== null){
         away=0
     }
     if(conhome== null){
         conhome=0
     }
     if(conaway== null){
         conaway=0
     }
    await database.updateTeamStatline(home, away, conhome, conaway,  yellows, reds, teamids[i])
  }

  var matches =await database.getMatches()
    for (i in matches)
    {
      if(matches[i].home_team_score > matches[i].away_team_score)
      {
          await database.updateTeamPoints(matches[i].home_team_id, 3)
      }
      else if( matches[i].home_team_score < matches[i].away_team_score)
      {
            await database.updateTeamPoints(matches[i].away_team_id, 3)
      }
      else
      {
            await database.updateTeamPoints(matches[i].home_team_id, 1)
            await database.updateTeamPoints(matches[i].away_team_id, 1)
      }

      await database.updateMatchStatus(matches[i].id)
    }
  console.log("Team stats Updated")
}

async  function updatePlayerStats()
{
    var facts= await database.getMatchFacts()
    for (i in facts)
    {   
        await database.checkPlayersStatline(facts[i].player_id)
        await database.updatePlayerStatline(facts[i].type, facts[i].player_id)
        await database.updateMatchFactStatus(facts[i].id) 
    }
    console.log("Player Stats Updated")
}

module.exports = {updateTeamStats , updatePlayerStats}
