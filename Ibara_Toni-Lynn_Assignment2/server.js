var express = require('express'); // loads the express module
var app = express(); // sets and starts the app module
var myParser = require("body-parser"); // loads the bpdy-parser module
var data = require('./static/products_data.js'); // Links the products page file and sets the the variable to 'data
const qs = require('qs'); // makes qs as the loaded query string module
var products = data.products; // loads the products page to the variable 'products'
var filedata = 'user_data.json'; // new variable to the user data file 
var fs = require('fs'); // loads the file system
const { request } = require('express');

var userdatafile = './user_data.json';
if (fs.existsSync(filedata)) {
    var filestats = fs.statSync(filedata); // gets the stats from the file
    var userdata = JSON.parse(fs.readFileSync(userdatafile,'utf-8'));
    console.log(`${userdatafile} has ${filestats["size"]} characters`); // outputs the characters of the data file
} else {
    console.log(`${userdatafile} does not exist :(`)
}

app.all('*', function (request, response, next) { // for all the request methods
    console.log(request.method + ' to ' + request.path); // how the request method gets written in the console and path
    next(); // continue on
});

app.use(myParser.urlencoded({ extended: true })); // get the data in the body

// Referenced and modified from Lab 14
app.post('/process_purchase', function (request, response) {
    let POST = request.body; // create a variable
    console.log(POST);
    if(typeof POST ['purchasesubmit'] !='undefined') {
        var validquantities = true; // assumes the values are true and has valid quantities
        var hasquantities = false
        for (i=0; i < products.length; i++) {

            qty = POST [`quantity${i}`];
            hasquantities = hasquantities || qty > 0; // valid if the value is > 0
            validquantities = validquantities && isNonNegInt(qty); // if they are both valid and >0
        }

    const stringified = qs.stringify(POST); // generate invoice if all the quantities are valid
    if (validquantities && hasquantities) {
        response.redirect("./login.html?" + stringified); // direct to login page with the query string of the order quantities
    } else {
        response.redirect("./products_display.html?" + stringified)
        }
    }
});

// repeats the function from the products_display.html to create a relation between the two pages
function isNonNegInt(q, returnErrors = false) {
    if(q=='') q=0;
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('NOT A NUMBER!'); // Check if string is a number value
    if (q < 0) errors.push('NEGATIVE VALUE!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('NOT AN INTEGER!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

// login page server side starts now
app.post("/processlogin", function (req,res) {
    var LogError =[];
    console.log(req.query);
    theusername = req.body.username.toLowerCase();
    //let usernameentered = req.body["username"];
    let passwordentered = req.body["password"]
    if (typeof userdata[theusername] !='undefined') { // if the object does not have a matching username, it will be undefined
        if (userdata[theusername]["password"] == passwordentered) {
            req.query["username"] = theusername;
            console.log(userdata[req.query.username].name);
            req.query.name = userdata[req.query.username].name
            res.redirect ('/invoice.html?' + qs.stringify(req.query));
            return;
            // Redirect to invoice if they log in with the correct username and password
        } else { // if the password is incorrect, there will be a message in the console
            LogError.push ('OH NO, PASSWORD INCORRECT!');
            console.log(LogError);
            req.query["username"] = theusername;
            req.query["name"] = userdata[theusername]["name"];
            req.query["LogError"] = LogError.join(';');
        }
    } else { // if the username is incorrect, there will be a message in the console
        LogError.push = ('OH NO, USERNAME INCORRECT!');
        console.log(LogError);
        req.query["username"] = theusername;
        req.query["LogError"] = LogError.join(';');
    }
    res.redirect('./login.html?' + qs.stringify(req.query)); // stay on the login page if there are errors
});

// Registration Page server side starts now
app.post('/process_register', function(req, res) {
    // add a new user to the data base
    console.log(req.body);
    // Referenced some code from Lab 14 and friend
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)){ // only allow to have letters in the name
    } 
    else {
        errors.push('ONLY LETTERS')
    }
    if (req.body.name== "") { // validate name
        errors.push('INVALID FULL NAME');
    }
    if (req.body.fullname.length > 25 && req.body.fullname.length < 0) { // length of the full name is between 0 and 25
        errors.push ('NAME TOO LONG')
    }
    
    var registereduser = req.body.username.toLowerCase(); // checks the new username 
    if (typeof userdata[registereduser] !='undefined') { // error message if the username is taken
        errors.push ('USERNAME TAKEN')
    }
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) { // username is in number and letters
    } 
    else {
        errors.push('ONLY LETTERS AND NUMBERS FOR USERNAME!')
    }

    if(req.body.password.length < 6) { // password needs to be less than 6 characters
        errors.push('PASSWORD IS TOO SHORT!')
    }
    if (req.body.password != req.body.repeatpassword){ // checks if both passwords match
        errors.push('PASSWORDS DO NOT MATCH!')
    }

    // Referenced and modified from Lab14
    // make form sticky
    req.query["fullname"] = req.query["fullname"];
    req.query["username"] = req.query["username"];
    req.query["email"] = req.query["email"];
    if (errors.length == 0) {
        console.log ('NO ERRORS!');
        var username = req.body["username"];
        userdata[username] = {};
        userdata[username]["name"] = req.body["fullname"];
        userdata[username]["password"] = req.body["password"];
        userdata[username]["email"] = req.body["email"];
        data = JSON.stringify(userdata);
        fs.writeFileSync(filedata, data,"utf-8");
        res.redirect('./invoice.html?' + qs.stringify(req.query) + qs.stringify(req.body));
    } 
        
    

    // redirect user to registration page if there are errors
    if (errors.length > 0) {
        console.log(errors)
        req.query["name"] = req.body["fullname"];
        req.query["username"] = req.body["username"];
        req.query["email"] = req.body["email"];
        req.query["password"] = req.body["password"];
        req.query["repeatpassword"] = req.body["repeatpassword"];

        req.query.errors = errors.join(';');
        res.redirect('register.html?' + qs.stringify(req.query))
    }
});



app.use(express.static('./static')); // creates static server using express from the static folder
app.listen(8080, () => console.log(`listening on port 8080`));