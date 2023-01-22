const connection = require("./db");

module.exports = {
    loadHome: (req,res)=> {
        res.clearCookie('email', {path: '/'});
        res.render('SignIn',{
            v1 : "Welcome to Sneaker Locker"
        });
    },

    loadSearch: (req,res)=> {
        if(req.cookies.email !== undefined) {
            res.render('Search', {
                user: "Current User: " + req.cookies.email,
            });
        }
        else{
            res.render('Search', {
                user: "",
            });
        }
    },

    loadContact : (req,res)=> {
        if(req.cookies.email !== undefined) {
            res.render('Contact',{
                user: "Current User: " + req.cookies.email,
            });
        }
        else{
            res.render('Contact', {
                user: "",
                loggedIn: true
            });
        }
    },

    loadAbout : (req,res)=> {
        if(req.cookies.email !== undefined) {
            res.render('About', {
                user: "Current User: " + req.cookies.email
            });
        }
        else{
            res.render('About', {
                user: "",
                loggedIn: true
            });
        }
    },
    rateDB :(req, res) => {
        const query = 'SELECT Round(AVG(ratingScore),2) FROM ratings';
        connection.query(query, (error, results) => {
            if (error) {
                res.status(400).render('Continue', {
                    v1: "http://localhost:3000/Rate",
                    v2: "Error executing query" + error
                })
            }
            if (results.length > 0) {
                res.render('Rate', {
                    rate: results[0]['Round(AVG(ratingScore),2)'],
                    user : "Current User: " + req.cookies.email,
                });
            } else {
                res.render('Rate', {
                    rate: 'No ratings available',
                    user : "Current User: " + req.cookies.email,
                });
            }
        });
    },

    sendMessage : async (req, res)=>{
        // Generate a unique id
        let id = generateId();
        while (await checkMSGId(id)) {
            id = generateId();
        }

        const date = Date();
        const newMessage = {
            "messageID": id,
            "fullName": req.body.fullname,
            "mail": req.body.mail,
            "country": req.body.country,
            "message": req.body.subject,
            "date": date
        };
        const Q = "INSERT INTO messages SET?"

        connection.query(Q, newMessage, (err,mysqlres) => {
            if(err) {
                res.status(400).render('Continue', {
                    v1: "http://localhost:3000/Contact",
                    v2: "error in sending message" + err
                })
            }
            console.log("Message Sent");
            res.render('Continue', {
                v1: "http://localhost:3000/Contact",
                v2: "Message Sent Successfully! Click Here to Continue"
            });
            return;
        })
    },

    rateSuccess : async (req, res) => {
        // Get the current rating from the request body
        const rate = req.body.rating;
        const date = Date();
        // Generate a unique id
        let id = generateId();
        while (await checkRateId(id)) {
            id = generateId();
        }
        const email = req.cookies.email;
        //Check If The Customer Has Rated Already
        checkIfRated(email, (check) => {
            // Insert the current rating and the unique id into the database
            if(check === true) {
                updateRating(rate,email);
                res.render('Continue', {
                    v1: "http://localhost:3000/Rate",
                    v2: "Rating Updated! Click Here to Continue"
                });

            }
            else{
                const query = 'INSERT INTO ratings (ratingID, ratingScore, date, email) VALUES (?, ?, ?, ?)';
                connection.query(query, [id, rate, date, email], (error, results) => {
                    if (error) {
                        res.status(400).render('Continue', {
                            v1: "http://localhost:3000/Rate",
                            v2: "Error executing query" + error
                        })
                    }
                    res.render('Continue', {
                        v1: "http://localhost:3000/Rate",
                        v2: "Rating Added to Database! Click Here to Continue"
                    });
                });
            }
        });
    },


    signUpSuccess : (req, res)=>{
        if(!req.body) {
            res.status(400).render('Continue', {
                v1: "http://localhost:3000/SignUp",
                v2: "Content can not be empty!"
            })
        }
        const newCustomer = {
            "email": req.body.UsernameSU,
            "password": req.body.PasswordSU,
            "first": req.body.First,
            "last": req.body.Last,
            "age": req.body.Age
        };
        const mail = req.body.UsernameSU;
        checkIfCustomerExists(mail, exists => {
            if (!exists) {
                const Q2 = "INSERT INTO customers SET?";
                connection.query(Q2, newCustomer, (err,mysqlres) => {
                    if(err) {
                        console.log("error: ", err);
                        res.status(400).render('Continue', {
                            v1: "http://localhost:3000/SignUp",
                            v2: "error in sign up" + err
                        })
                    }
                    console.log("created customer");
                    res.render('Continue', {
                        v1: "http://localhost:3000/",
                        v2: "Customer Created! Click Here to Continue"
                    });;
                    return;
                })
            }
            else
            {
                console.log("Email already exists");
                res.render('Continue', {
                    v1: "http://localhost:3000/SignUp",
                    v2: "Email Already Exists, Click Here to Try Again"
                });
                return;
            }
        })
    },

    signInSuccess : (req, res)=>{
        if(!req.body) {
            res.status(400).render('Continue', {
                v1: "http://localhost:3000/",
                v2: "Content can not be empty!"
            })
        }
        const mail = req.query.UsernameSI;
        const pass = req.query.PassSI;
        const queryString = "SELECT * FROM customers WHERE email = ? AND password = ?";

        connection.query(queryString, [mail,pass], (error, results) => {
            if (error) {
                res.status(400).render('Continue', {
                    v1: "http://localhost:3000/",
                    v2: "error in sign in" + error
                })
            }
            if (results.length > 0) {
                console.log("Login Successful");
                res.cookie('email', results[0].email, {httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7});
                res.render('Continue', {
                    v1: "http://localhost:3000/Search",
                    v2: "Login Successfull! Click Here to Continue"
                });
                return;
            }
            else {
                console.log("Username and Password do not match");
                res.render('Continue', {
                    v1: "http://localhost:3000/",
                    v2: "Username and Password do not match, Click Here to Return"
                });
                return;
            }

        });
    },

    searchResults : async (req, res) => {
        const checkbox1 = req.query.High === 'value1';
        const checkbox2 = req.query.Low === 'value2';
        let shoeType = '';
        let dropdownBrand = req.query.brands;
        if(dropdownBrand === "newbalance"){
            dropdownBrand = "New Balance";
        }
        const fromYear = req.query.FromYear;
        const untilYear = req.query.UntilYear;
        const maxValue = parseInt(req.query.MaxValue, 10);
        const email = req.cookies.email;
        const timeStamp = Date();
        let id = generateId();
        while (await checkSearchId(id)) {
            id = generateId();
        }
        const toSearch = { "searchID" : id ,
            "searchTime" : timeStamp,
            "brand" : dropdownBrand,
            "max" : maxValue,
            "email" : email};
        saveSearch(toSearch);
        countSearch(email);
        let Q = 'SELECT * FROM products WHERE Brand = ? AND Year BETWEEN ? AND ? AND Value <= ?';
        const values = [dropdownBrand, fromYear, untilYear, maxValue];

        if (checkbox1 === true && checkbox2 === false) {
            shoeType = 'High';
            Q += ' AND Type = ?';
            values.push(shoeType);
        }

        if (checkbox1 === false && checkbox2 === true) {
            shoeType = 'Low';
            Q += ' AND Type = ?';
            values.push(shoeType);
        }
        connection.query(Q, values, (err, results) => {
            if (err) {
                res.status(400).render('Continue', {
                    v1: "http://localhost:3000/Search",
                    v2: "error " + err
                })
            }
            if(results.length > 0){
                res.render('Results', {
                    v1: "These Are Your Results",
                    products: results,
                    user : "Current User: " + req.cookies.email
                });
                return;
            }
            else{
                res.render('Results', {
                    v1: "Sorry No Products Matching Your Search :(",
                    products: '',
                    user : "Current User: " + req.cookies.email
                });
                return;
            }
        })
    },

    Recommend : (req,res) => {
        let current_user = req.cookies.email;
        let Q = 'Select Max(searchTime) FROM searches WHERE email = ?';
        let time = "";
        connection.query(Q, current_user, (err, results) => {
            if (err) {
                res.status(400).render('Continue', {
                    v1: "http://localhost:3000/Search",
                    v2: "error " + err
                })
            }
            if(results[0]['Max(searchTime)'] !== null) {
                time = results[0]['Max(searchTime)'];
                recommendProducts(time,res,req);
            }
            else{
                console.log("You Do not Have Previous Searches")
                res.render('Results', {
                    v1: "You Do Not Have Previous Searches",
                    products: '',
                    user: "Current User: " + req.cookies.email,
                    log : true
                });
                return;
            }
        })
    }
}

// generate random id
function generateId() {
    return Math.floor(Math.random() * 10000);
}

// Check if an id exists in the database
function checkRateId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ratings WHERE ratingID = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}

// Check if an id exists in the database
function checkMSGId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM messages WHERE messageID = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}

function checkSearchId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM searches WHERE searchID = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}

function checkIfCustomerExists(email, callback) {
    connection.query(
        'SELECT * FROM customers WHERE email = ?',
        [email],
        (error, result) => {
            if (error) throw error;
            callback(result.length > 0);
        }
    );
}

function saveSearch(search, callback) {
    connection.query(
        'INSERT INTO searches (searchID, searchTime, brand, max, email) VALUES (?, ?, ?, ?, ?)',
        [search.searchID, search.searchTime, search.brand, search.max, search.email],
        console.log("search saved")
    );
}



function countSearch(current_user) {
    let Q = 'SELECT Count(*) FROM searches WHERE email = ?'
    connection.query(Q, [current_user], (err, results) => {
        if (results[0]['Count(*)'] > 2) {
            console.log("search counted");
            minSearchTime(current_user);
        }
        return
    });
}

function minSearchTime(current_user) {
    let Q = 'SELECT Min(searchTime) FROM searches WHERE email = ?'
    connection.query(Q, [current_user], (err, results) => {
        deleteSearch(current_user,results[0]['Min(searchTime)']);
        return
    });
}
function deleteSearch(current_user,time) {
    let Q = 'Delete FROM searches WHERE email = ? AND searchTime = ?'
    connection.query(Q, [current_user,time], (err, results) => {
        console.log("search deleted");
        return
    });
}

function recommendProducts(time,res,req){
    let Q = 'SELECT brand,max FROM searches WHERE searchTime = ?'
    connection.query(Q, [time], (err, results) => {
        if (results.length > 0) {
            searchTime(results[0].brand,results[0].max,res,req);
            return;
        }
    });
}

function searchTime(brand,max,res,req){
    let Q = 'SELECT * FROM products WHERE Brand = ? AND Value <= ?'
    connection.query(Q, [brand,max], (err, results) => {
        if (results.length > 0) {
            res.render('Results', {
                v1: "These Are Your Recommendations",
                products: results,
                user: "Current User: " + req.cookies.email,
                log: true
            });
            return;
        } else {
            res.render('Results', {
                v1: "No Products Found That Match Last Search",
                products: '',
                user: "Current User: " + req.cookies.email
            });
            return;
        }
    })

}

function checkIfRated(email,cb){
    let Q = 'SELECT * FROM ratings WHERE email = ?'
    connection.query(Q, [email], (err, results) => {
        if (results.length > 0) {
            cb(true);
        }
        else{
            cb(false);
        }
    });
}

function updateRating(rate,email){
    let date = Date();
    let Q = 'UPDATE ratings Set ratingScore = ?, date = ? WHERE email = ?'
    connection.query(Q, [rate,date,email], (err, results) => {
        console.log("Rating Updated");
        return;
    });
}
