require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Project = require('./model/project.model');

const app = express();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.use(express.static("public"));

const port = process.env.PORT || 3000;


app.get("/getprojects", (req, res) => {
    Project.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.post("/newproject", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const members = req.body.members;

    const newProject = new Project({title, description, members});

    newProject.save()
        .then(() => res.status(200).end('OK'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

app.post("/deleteproject", (req, res) => {
    Project.findOneAndRemove({title: req.body.title})
        .then(() => res.status(200).end('OK'))
        .catch((err) => res.status(400).end(err));
});

app.listen(port, () => {
    console.log("Server available at port: " + port);
});