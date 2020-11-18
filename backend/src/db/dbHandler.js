const sqlite3 = require('sqlite3');

class dbHandler {
    constructor(){
        this.db = new sqlite3.Database('src/db/projects.sqlite');
    }

    getAllProjects(callback) {
        // Get data from db
        this.db.all(`SELECT * FROM Projects`, (err, res) => {
            if(err) {
                console.log('Error: ' + err);
            }
            callback(res);
        }); 
    }

    createProject(title, description, members) {
        // Insert data in database
        this.db.run(`INSERT INTO Projects VALUES ('${title}', ${description}, '${members}');`, (err) => {
            if(err){
                console.log('Error: ' + err);
            }
        });
    }
}

module.exports = dbHandler;