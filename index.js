import express from "express";
const app = express();
import cors from "cors";
import mysql from "mysql";
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "b3390b4687efaf",
  host: "eu-cdbr-west-01.cleardb.com",
  password: "ed3526bc",
  database: "heroku_8710917fecf1cf0",
});

app.get("/api/hello", (req, res) => {
  res.send("Hello world, his is working!");
});

app.get("/api/getAllEntities", (req, res) => {
  db.query("SELECT * FROM entity", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running at port " + PORT);
});