const mysql= require('mysql')


const connection =  mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "",
  database: "sportuniversedb"
  });
  
 

 function getDrivers() {
  connection.query("Select * from premierleague", (err, rows, fields) => {
    if (err) throw err  
    return rows
  })
 
  }
  
 

module.exports ={getDrivers}