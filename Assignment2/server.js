var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./static/products_data.js');
const qs = require('qs');
var products = data.products;
var filedata = 'user_data.json';
var fs = require('fs');

var userdatafile = './user_data.json';
if (fs.existsSync(filedata)) {
    var filestats = fs.statSync(filedata);
    var userdata = JSON.parse(fs.readFileSync(userdatafile,'utf-8'));
    console.log(`${userdatafile} has ${filestats["size"]} characters`);
} else {
    console.log(`${userdatafile} does not exist :(`)
}

app.all('*', function (request, response, next) {
    console.log(request.method + 'to' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

app.post('/process_purchase', function (request, response) {
    let POST = request.body; 
 
    if(typeof POST ['purchasesubmit'] !='undefined') {
        var validquantities = true;
        var hasquantities = false
        for (i=0; i < products.length; i++) {

            qty = POST [`quantity${i}`];
            hasquantities = hasquantities || qty > 0;
            validquantities = validquantities && isNonNegInt(qty);
        }

    const stringified = qs.stringify(POST);
    if (validquantities && hasquantities) {
        response.redirect("./login.html?" + stringified);
    } else {
        response.redirect("./products_display.html?" + stringified)
        }
    }
});

function isNonNegInt(q, returnErrors = false) {
    if(q=='') q=0;
    var errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('NOT A NUMBER!'); // Check if string is a number value
    if (q < 0) errors.push('NEGATIVE VALUE!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('NOT AN INTEGER!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

// login page
app.post("/processlogin", function (req,res) {
    var LogError =[];
    console.log(req.query);
    theusername = req.body.username.toLowerCase();
    let usernameentered = req.body["username"];
    let passwordentered = req.body["password"]

    if (typeof userdata[theusername] !='undefined') {
        if (userdata[theusername]["password"] == passwordentered) {
            req.query["username"] = theusername;
            console.log(userdata[req.query.username].name);
            req.query.name = userdata[req.query.username].name
            res.redirect ('/invoice.html?' + qs.stringify(req.query));
            return;
            // Redirect to invoice if they log in with the correct username and password
        } else {
            LogError.push ('OH NO, PASSWORD INCORRECT!');
            console.log(LogError);
            req.query["username"] = theusername;
            req.query["name"] = userdata[theusername]["name"];
            req.query["LogError"] = LogError.join(';');
        }
    } else {
        LogError.push = ('OH NO, USERNAME INCORRECT!');
        console.log(LogError);
        req.query["username"] = theusername;
        req.query["LogError"] = LogError.join(';');
    }
    res.redirect('./login.html?' + qs.stringify(req.query));
});

// Registration Page
app.post('/process_register', function(req, res) {
    // add a new user to the data base
    qstr = req.body
    console.log(qstr);
    // Referenced some code from Lab 14 and Tyler Johnson
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)){
    } else {
        errors.push('ONLY LETTERS')
    }
    if (req.body.name== "") {
        errors.push('INVALID FULL NAME');
    }
    if (req.body.fullname.length > 25 && req.body.fullname.length < 0) {
        errors.push ('NAME TOO LONG')
    }
    
    var registereduser = req.body.username.toLowerCase();
    if (typeof userdata[registereduser] !='undefined') {
        errors.push ('USERNAME TAKEN')
    }
    if (/^[0-9a-zA-Z] + $/.test(req.body.username)) {
    } else {
        errors.push('ONLY LETTERS AND NUMBERS FOR USERNAME!')
    }

    if(req.body.password.length < 6) {
        errors.push('PASSWORD IS TOO SHORT!')
    }
    if (req.body.password != req.body.repeatpassword){
        errors.push('PASSWORDS DO NOT MATCH!')
    }

    if (errors.length == 0) {
        console.log ('NO ERRORS!');
        var username = req.body["username"];
        userdata[username] = {};
        userdata[username]["name"] = req.body["fullname"];
        userdata[username]["password"] = req.body["password"];
        userdata[username]["email"] = req.body["email"];
        data = JSON.stringify(userdata);
        fs.writeFileSync(filedata, data,"utf-8");
        res.redirect('./invoice.html?' + qs.stringify(req.query));
    }

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



app.use(express.static('./static'));
app.listen(8080, () => console.log(`listening on port 8080`));