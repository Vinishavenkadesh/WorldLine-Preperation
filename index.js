const express = require("express");
const cors = require("cors")
const mysql = require("mysql2")
const path = require("path")
const app = express()


const PORT = 3000;
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname + "/static")))

const sql = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "password",
    database : "forms"
})
.promise();

app.get("/", (req,res) => {
   res.sendFile(__dirname + "/static/index.html")
}
)

app.get("/getData",async(req,res)=>{
    const query = "select * from forms";
    const [output] = await sql.query(query);
    res.send(output)
})

app.post("/postdata",async(req,res)=>{
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const query = "insert into forms(email,phoneNumber) values(?,?)"
    await sql.query(query,[email,phoneNumber]);
    res.send(console.log("POSTED SUCCESFFULLY"))
})

app.listen(PORT, ()=> {
    console.log(`Listening to the PORT : ` + PORT);
})