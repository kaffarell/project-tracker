const express = require('express');
const path = require('path');
const dbHandler = require('./db/dbHandler');

const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.use(express.static("public"));

const port = process.env.PORT || 3000;


app.get("/getprojects", (req, res) => {
    let handler = new dbHandler();
    handler.getAllProjects((result) => {
        res.send(result);
    })
});

//app.post("/newproject");

app.listen(port, () => {
    console.log("Server available at port: " + port);
});