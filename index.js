const express = require('express');
const app = express();
const path = require('path');
const csv = require('csvtojson');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('./db/db');
const CreateDB = require('./db/CreateDB');
const crud = require('./db/CRUD');
const {response} = require("express");
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));

// Load View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/createDB',(req,res)=> {
    res.redirect('/CreateTable');
})

app.get('/CreateTable',CreateDB.CreateTables)

app.get("/InsertData", CreateDB.InsertData);

app.get("/ShowTable", CreateDB.ShowTable);

app.get("/DropTable", CreateDB.DropTable);

app.get('/',(req,res)=> {
    res.redirect('/SignIn');
})

app.get('/SignIn', crud.loadHome);

app.listen(port,()=>{
    console.log("server is running on port "+port);
})

app.get('/SignUp',(req,res)=> {
    res.render('SignUp');
})

app.get('/Search', crud.loadSearch);

app.get('/Results',(req,res)=> {
    res.render('Results');
})

app.get('/Rate', crud.rateDB);

app.get('/Contact', crud.loadContact);

app.get('/About', crud.loadAbout);

app.get('/Recommend',crud.Recommend);

app.post('/Contacted',crud.sendMessage);

app.post('/ratedSuccess', crud.rateSuccess);


app.post('/signUpSuccess', crud.signUpSuccess);


app.get('/signInSuccess', crud.signInSuccess);


app.get('/SearchResults', crud.searchResults);

