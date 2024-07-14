CREATE TABLE cricketteam(
    playerid INTEGER PRIMARY KEY AUTOINCREMENT, 
   playername TEXT, 
   jerseynumber INTEGER,
   role TEXT
)


INSERT INTO cricketteam(

   playername,
   jerseynumber,
   role

) VALUES ("Sachin",10,"Batting"),
("Dhoni",7,"Keeper"),
("Sehwag",8,"All-Rounder"),
("Gambhir",5,"Batting"),
("Rayudu",73,"Blower");

SELECT * FROM cricketteam;

DELETE FROM cricketteam WHERE playerid = ;