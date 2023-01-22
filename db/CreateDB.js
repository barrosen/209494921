var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

module.exports = {


    CreateTables: (req, res) => {
        createCustomers();
        createProducts();
        createRatings();
        createMessages();
        createSearches();
        res.render('Continue', {
            v1: "http://localhost:3000/InsertData",
            v2: "Click Here to Insert Data to Tables"
        });
        return;
    },


    InsertData: (req, res) => {
        insertCustomers();
        insertProducts();
        insertRatings();
        insertMessages();
        insertSearches();
        res.render('Continue', {
            v1: "http://localhost:3000/ShowTable",
            v2: "Click Here to See Tables Data"
        });
        return;
    },

    DropTable: (req, res) => {
        dropCustomers();
        dropProducts();
        dropRatings();
        dropMessages();
        dropSearches();
        res.render('Continue', {
            v1: "http://localhost:3000/CreateTable",
            v2: "All Tables Dropped, Click Here to Create Tables"
        });
        return;
    },

    ShowTable: (req,res) => {
        Promise.all([showCustomers(), showProducts(), showRatings(), showMessages(), showSearches()]).then(values => {
            res.render('Show', {
                title1 : "Customers Table :",
                customers : values[0],
                title2: "Products Table: ",
                products: values[1],
                title3: "Ratings Table: ",
                ratings: values[2],
                title4: "Messages Table: ",
                messages: values[3],
                title5: "Searches Table: ",
                searches: values[4]
            });
        }).catch(err => {
            console.log("Error in showing customers or products: ", err);
        });
    }
}

function createCustomers() {
    var Q1 = "CREATE TABLE customers (email VARCHAR(255), password VARCHAR(255), first VARCHAR(255),last VARCHAR(255),age VARCHAR(255))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log("Customers Table Created");
    })
}

function createProducts() {
    var Q2 = "CREATE TABLE products (productID VARCHAR(255), name VARCHAR(255), Type VARCHAR(255),Brand VARCHAR(255),Year VARCHAR(255),Value VARCHAR(255),Info VARCHAR(255),Link VARCHAR(255))";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log("Products Table Created");
    })
}
function createRatings() {
    var Q3 = "CREATE TABLE ratings (ratingID VARCHAR(255), ratingScore VARCHAR(255), date VARCHAR(255), email VARCHAR(255))";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log("Ratings Table Created");
    })
}

function createMessages() {
    var Q4 = "CREATE TABLE messages (messageID VARCHAR(255), fullName VARCHAR(255), mail VARCHAR(255),country VARCHAR(255),message VARCHAR(255), date VARCHAR(255))";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log("Messages Table Created");
    })
}

function createSearches() {
    var Q5 = "CREATE TABLE searches (searchID VARCHAR(255), searchTime VARCHAR(255), brand VARCHAR(255),max VARCHAR(255), email VARCHAR(255))";
    SQL.query(Q5, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            return;
        }
        console.log("Searches Table Created");
    })
}

function dropCustomers() {
    var Qd1 = "DROP TABLE customers";
    SQL.query(Qd1, (err, mysqlres) => {
        if (err) {
            console.log("error in dropping customers table", err);
        }
    });
    console.log("Customers Table Dropped");
}

function dropProducts() {
    var Qd2 = "DROP TABLE products";
    SQL.query(Qd2, (err, mysqlres) => {
        if (err) {
            console.log("error in dropping products table", err);
        }
    });
    console.log("Products Table Dropped");
}

function dropRatings() {
    var Qd3 = "DROP TABLE ratings";
    SQL.query(Qd3, (err, mysqlres) => {
        if (err) {
            console.log("error in dropping ratings table", err);
        }
    });
    console.log("Ratings Table Dropped");
}

function dropMessages() {
    var Qd4 = "DROP TABLE messages";
    SQL.query(Qd4, (err, mysqlres) => {
        if (err) {
            console.log("error in dropping messages table", err);
        }
    });
    console.log("Messages Table Dropped");
}

function dropSearches() {
    var Qd5 = "DROP TABLE searches";
    SQL.query(Qd5, (err, mysqlres) => {
        if (err) {
            console.log("error in dropping searches table", err);
        }
    });
    console.log("Searches Table Dropped");
}

function insertCustomers() {
    var Q = "INSERT INTO customers SET ?";
    const csvFilePath = path.join(__dirname, "./csv_files/customers.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                var NewEntry = {
                    "email": element.email,
                    "password": element.password,
                    "first": element.first,
                    "last": element.last,
                    "age": element.age
                }
                SQL.query(Q, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                });
                console.log("Data Inserted Into Customers")
            });
        });
}

function insertProducts() {
    var Q = "INSERT INTO products SET ?";
    const csvFilePath = path.join(__dirname, "./csv_files/products.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                var NewEntry = {
                    "productID": element.productID,
                    "name": element.name,
                    "Type": element.Type,
                    "Brand": element.Brand,
                    "Year": element.Year,
                    "Value": element.Value,
                    "Info": element.Info,
                    "Link": element.Link
                }
                SQL.query(Q, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                });
                console.log("Data Inserted Into Products ");
            });
        });
}

function insertRatings() {
    var Q = "INSERT INTO ratings SET ?";
    const csvFilePath = path.join(__dirname, "./csv_files/ratings.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                var NewEntry = {
                    "ratingID": element.ratingID,
                    "ratingScore": element.ratingScore,
                    "date": element.date,
                    "email": element.email
                }
                SQL.query(Q, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                });
                console.log("Data Inserted Into Ratings")
            });
        });
}

function insertMessages() {
    var Q = "INSERT INTO messages SET ?";
    const csvFilePath = path.join(__dirname, "./csv_files/messages.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                var NewEntry = {
                    "messageID": element.messageID,
                    "fullName": element.fullName,
                    "mail": element.mail,
                    "country": element.country,
                    "message": element.message,
                    "date": element.date
                }
                SQL.query(Q, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                });
                console.log("Data Inserted Into Messages ");
            });
        });
}

function insertSearches() {
    var Q = "INSERT INTO searches SET ?";
    const csvFilePath = path.join(__dirname, "./csv_files/searches.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                var NewEntry = {
                    "searchID": element.searchID,
                    "searchTime": element.searchTime,
                    "brand": element.brand,
                    "max": element.max,
                    "email": element.email
                }
                SQL.query(Q, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                });
                console.log("Data Inserted Into Searches")
            });
        });
}

function showCustomers(){
    return new Promise((resolve, reject) => {
        var Q = "SELECT * FROM customers";
        SQL.query(Q, (err, mySQLres)=>{
            if (err) {
                reject(err);
                return;
            }
            resolve(mySQLres);
        });
    });
}

function showProducts(){
    return new Promise((resolve, reject) => {
        var Q = "SELECT * FROM products";
        SQL.query(Q, (err, mySQLres)=>{
            if (err) {
                reject(err);
                return;
            }
            resolve(mySQLres);
        });
    });
}

function showRatings(){
    return new Promise((resolve, reject) => {
        var Q = "SELECT * FROM ratings";
        SQL.query(Q, (err, mySQLres)=>{
            if (err) {
                reject(err);
                return;
            }
            resolve(mySQLres);
        });
    });
}

function showSearches(){
    return new Promise((resolve, reject) => {
        var Q = "SELECT * FROM searches";
        SQL.query(Q, (err, mySQLres)=>{
            if (err) {
                reject(err);
                return;
            }
            resolve(mySQLres);
        });
    });
}

function showMessages(){
    return new Promise((resolve, reject) => {
        var Q = "SELECT * FROM messages";
        SQL.query(Q, (err, mySQLres)=>{
            if (err) {
                reject(err);
                return;
            }
            resolve(mySQLres);
        });
    });
}
