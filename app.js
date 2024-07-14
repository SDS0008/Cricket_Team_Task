const express = require("express");

const {open} = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path");

const app = express();

const dbPath = path.join(__dirname,"cricketTeam.db");

app.use(express.json());

let db = null;

const initilaizeDbAndServer = async()=> {

    try {
        db = await open({
          filename: dbPath,
          driver: sqlite3.Database,
        });
        const port = 5555;
        app.listen(port, () => {
          console.log(`DB Connected\nServer Running at ${port}`);
        });
      } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
      }

};

initilaizeDbAndServer();

//Add Players to Database Table...
app.post("/players/", async(req,res) => {
try {
    const {playername,jerseynumber,role} = req.body;

 const addPlayerQuery = `INSERT INTO cricketteam( playername, jerseynumber, role) 
 VALUES ('${playername}',${jerseynumber},'${role}');`;

        const cricketTeam = await db.run(addPlayerQuery);

        res.status(201).json({
            message :` Player added to the cricketTeam Table with Id : ${cricketTeam.lastId}`
        });


} catch (error) {
    console.log("players" , error.message);
    res.status(500).send("Internal Server Error");
}
});


//Get All Players from Table...
app.get("/players/", async(req,res) => {
    try {
     
        const fetchQuery = `SELECT * FROM  cricketteam;`;

        const cricketTeam  = await db.all(fetchQuery);

    
            res.status(200).json({
                message :` Fetched All Players from cricketTeam Table`, cricketTeam : cricketTeam
            });
    
    
    } catch (error) {
        console.log("players" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    

//Get a Single Player from Table...
app.get("/players/:playerId", async(req,res) => {
    try {
     
        const {playerId} = req.params;

        const fetchQuery = `SELECT * FROM  cricketteam WHERE playerid = ${playerId};`;

        const SinglePlayer  = await db.all(fetchQuery);

    
            res.status(200).json({
                message :` Fetched  PlayerId : ${playerId} from cricketTeam Table`, SinglePlayer : SinglePlayer
            });
    
    
    } catch (error) {
        console.log("players" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    

//Update player And Add to Database Table...
app.put("/players/:playerId", async(req,res) => {
    try {
        const {playerId} = req.params;
        const {playername,jerseynumber,role} = req.body;
    
     const updatePlayerQuery =  `UPDATE cricketteam SET playername = '${playername}', jerseynumber = ${jerseynumber},role = '${role}' WHERE playerid = ${playerId}`;
     
    
            const cricketTeam = await db.run(updatePlayerQuery);
    
            res.status(200).json({
                message :` Player updated Successfully with playerId : ${playerId}`
            });
    
    
    } catch (error) {
        console.log("players" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });

    

//Delete player from Database Table...
app.delete("/players/:playerId", async(req,res) => {
    try {
        const {playerId} = req.params;
       
    
     const deletePlayerQuery =  `DELETE FROM cricketteam WHERE playerid = ${playerId}`;
     
    
            const cricketTeam = await db.run(deletePlayerQuery);
    
            res.status(201).json({
                message :` Player deleted Successfully with playerId : ${playerId}`
            });
    
    
    } catch (error) {
        console.log("players" , error.message);
        res.status(500).send("Internal Server Error");
    }
    });
    

