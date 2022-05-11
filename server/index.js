const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

const mysql= require('mysql')

const connection =  mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "sportuniversedb"
  });
  
  connection.connect()

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  next();
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/premierleague/teams", (req, res) => {
  let sql = "SELECT * FROM premierleague"
  connection.query(sql, (err, rows, fields) => {
      if (err) throw err  
      res.send(rows)
    })
 });

 app.get("/premierleague/teams/:id", (req, res) => {
   var id=req.params.id
  let sql = "SELECT name, town , owner, stadium ,fname , lname FROM premierleague inner join football_coaches on coach_id=football_coaches.id where premierleague.id="+id
  connection.query(sql, (err, rows, fields) => {
      if (err) throw err  
      console.log(rows)
      res.send(rows)
    })
 });

app.get("/laliga/teams", (req, res) => {
  let sql = "SELECT * FROM laliga"
  connection.query(sql, (err, rows, fields) => {
        if (err) throw err  
        res.send(rows)
    })
  });

app.get("/bundesliga/teams", (req, res) => {
  let sql = "SELECT * FROM bundesliga"
  connection.query(sql, (err, rows, fields) =>
   {
      if (err) throw err  
      res.send(rows)
  })
});

app.get("/serieA/teams", (req, res) => {
  let sql = "SELECT * FROM seriea"
  connection.query(sql, (err, rows, fields) =>
   {
      if (err) throw err  
      res.send(rows)
   })
});

app.get("/ligue1/teams", (req, res) => {
  let sql = "SELECT * FROM ligue1"
  connection.query(sql, (err, rows, fields) =>
   {
      if (err) throw err  
      res.send(rows)
   })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});