var mysql = require('mysql');
var config = require('./config');
var express = require('express');
const bodyParser = require('body-parser');

var server = express();
server.use(express.static('public'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.raw());

var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.dbname
});

server.get('/geturls', (req, res) => {
    console.log(req.query.user_name);
    if(!req.query.user_name){
        res.status(404).send("error");
        return;
    }
    pool.getConnection((error, connection) => {
        
        console.log(error);
        // console.log(connection);

        const query = req.query.user_name == "admin" ? 'select urls.url, urls.creation_date, urls.modify_date, urls.description, users.first_name, users.last_name, users.user_name from urls join users on urls.user_name=users.user_name;' : `select urls.url, urls.creation_date, urls.modify_date, urls.description, users.first_name, users.last_name, users.user_name from urls join users on urls.user_name=users.user_name where urls.user_name=\'${req.query.user_name}\';`;
        console.log(query);
        connection.query(query, (error, results, fields) => {
            connection.release();    
            if(error){
                console.log(error);
                res.status(200).send("error");
            }
            else{
                console.log(results);
                res.status(200).send(results);
            }            
        });        
    });        
});

server.post('/addurl', (req, res) => {
    console.log(req);
    pool.getConnection((error, connection) => {
    
        console.log(error);
        // console.log(connection);

        connection.query(`insert into urls values(\'${req.body.user_name}\',now(),\'\','',\'${req.body.url}\');`, (error, results, fields) => {
            connection.release();    
            if(error){
                res.status(500).send("error");
            }
            else{
                res.status(200).send(results);
            }            
        });        
    });        
});

server.post('/updateurl', (req, res) => {
    console.log(req);
    pool.getConnection((error, connection) => {
    
        console.log(error);
        // console.log(connection);

        connection.query(`update urls set modify_date=now() where url=\'${req.body.url}\';`, (error, results, fields) => {
            connection.release();    
            if(error){
                res.status(500).send("error");
            }
            else{
                res.status(200).send(results);
            }            
        });        
    });        
});

server.post('/adduser', (req, res) => {
    console.log(`User to be added:: ${req.body}`);
    pool.getConnection((error, connection) => {        
        console.log(`error in making SQL connection: ${error}`);
        // console.log(connection);

        connection.query(`insert into users values(\'${req.body.user_name}\',\'${req.body.first_name}\',\'${req.body.last_name}\',\'${req.body.password}\',\'user\')`, (error, results, fields) => {
            connection.release();    
            if(error){
                res.status(500).send("error");
            }
            else{
                res.writeHead(302, {
                    'Location': '/user' 
                });
                res.end();
            }            
        });        
    });        
});

server.post('/login', (req, res) => {
    console.log(`login request body ${JSON.stringify(req.body)}`);
    pool.getConnection((error, connection) => {
        connection.query(`select * from users where user_name=\'${req.body.user_name}\' and password=\'${req.body.password}\';`, (error, results, fields) => {
            connection.release();    
            if(error){
                res.status(500).send("error");
            }
            else{
                if(results.length == 0){
                    res.status(404).send("User not found");
                }
                else {
                    res.writeHead(302, {
                        'Location': '/user' 
                    });
                    res.end();                    
                }
            }            
        });        
    });
});

server.post('/deleteurl', (req, res) => {
    const body = req.body;
    console.log(`deleting object ${JSON.stringify(body)}`);
    pool.getConnection((error, connection) => {
        if(connection){
            connection.query(`delete from urls where url='${body.url}';`, (error, results, fileds) => {
                connection.release();
                if(error){
                    res.status(500).json(error).end();
                }
                else{
                    res.status(200).json(results).end();
                }
            });
        }

    });
});

server.get('/logout', (req, res) => {
    console.log('logout server');
    res.redirect("/login");    
    res.end();
});

//---HTMLS----

server.get("/login", (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

server.get("/user", (req, res) => {
    res.sendFile(__dirname + '/public/user.html');
});

server.listen(3000, () => {
    console.log(`listening at port 3000`);
});