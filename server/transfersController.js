const database= require('./database.js')


async function updateRosters(){
    var transfers =await database.getTransfers()
    for ( i in transfers) {
        await database.transferPlayer(transfers[i].player_id, transfers[i].to_team)
        await database.updateTransferStatus(transfers[i].id)
    }
}

module.exports={updateRosters}