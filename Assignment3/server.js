var express = require('express'); // loads the express module
var app = express(); // sets and starts the app module
var myParser = require("body-parser"); // loads the bpdy-parser module
var data = require('./static/products_data.js'); // Links the products page file and sets the the variable to 'data
const qs = require('qs'); // makes qs as the loaded query string module
var allproducts = data.allproducts; // loads the products page to the variable 'products'
var filedata = './user_data.json'; // new variable to the user data file 
var fs = require('fs'); // loads the file system
const { request } = require('express');
app.use(myParser.urlencoded({ extended: true })); // get the data in the body
var userdatafile = fs.readFileSync(filedata, 'utf-8'); // open data file and assign from userdata to a string variable
userdata =JSON.parse(userdatafile);
var session = require('express-session'); // require express-session module to transfer data to the body
const nodemailer = require("nodemailer"); // require the node mailer module
var cookieParser = require('cookie-parser'); // require cookie parser and the session variable is set for the session module
app.use(cookieParser()); // use cookie-parser middleware


app.all('*', function (req, res, next) { // for all the request methods
    console.log(req.method + ' to ' + req.path); // how the request method gets written in the console and path
    next(); // continue on



app.get("/get_cart", function (req, res) {
    res.json(req.session.cart);
});



if (fs.existsSync(filedata)) {
    var filestats = fs.statSync(filedata); // gets the stats from the file
    var userdata = JSON.parse(fs.readFileSync(userdatafile,'utf-8'));
    console.log(`${userdatafile} has ${filestats["size"]} characters`); // outputs the characters of the data file
} else {
    console.log(`${userdatafile} does not exist :(`)
}


});

var transporter = nodemailer.createTransport({ 
    host: 'mail.hawaii.edu', //hawaii.edu USE HAWAII EMAIL
    port: 25,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});
var mailOptions = {
    //sender is markushiroda@gmail.com
    from: 'markushiroda@gmail.com', 
    //email from the cookie from cart.html
    to: email, 
    subject: 'Invoice',
    //return as html in the body of the email
    html: str 
};

transporter.sendMail(mailOptions, function (error, info) {
    //if errors, sent to console
    if (error) {
        console.log(error);
    //notify me if email sent properly
    } else { 
        console.log('Email sent: ' + info.response);
    }
});

// string gets displayed in browser
response.send(str);


//The following was taken from stormpath.com and Lab15 ex4.js
app.use(session({
//random string to encrypt session ID
secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
//save session
resave: true, 
//forget session after user is done
saveUninitialized: false,
//allows browser js from accessing cookies
httpOnly: false, 
//ensures cookies are only used over HTTPS
secure: true,
// deletes cookie when browser is closed
ephemeral: true 
}));


// Referenced and modified from Lab 14
app.POST('/process_form', function (req, res) {
    let POST = req.body; // create a variable
    console.log(POST);
    if(typeof POST ['addProducts${i}'] !='undefined') {
        var validquantities = true; // assumes the values are true and has valid quantities
        var hasquantities = false
        for (i=0; i < `${(products_array[`brand`][i])}`.length; i++) {
            qty = POST[`quantity_textbox${i}`];
            if (qty > 0) {
                hasquantities = true;
            }
            if (isNonNegInt(qty) == false) {
                validquantities = false;
            }
        }

    const stringified = qs.stringify(POST); // generate invoice if all the quantities are valid
    if (validquantities && hasquantities) {
        res.redirect("./login.html?" + stringified); // direct to login page with the query string of the order quantities
    } else {
        res.redirect("./products_display.html?" + stringified)
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
app.post("/check_login", function (req,res) {
    errs=[];
    //console.log(req.query);
    var loginusername = req.body["username"];
    var userinfo = userdata[loginusername];
    var loginpassword = req.body["password"];

    if (typeof userdata[loginusername] !='undefined' || userdata[loginusername == '']) { // if the object does not have a matching username, it will be undefined
        errs.username = ('OH NO, USERNAME INCORRECT!');
        errs.password = ('OH NO, PASSWORD INCORRECT!');
    } else if (userinfo['password'] != loginpassword) {
        errs.username = '';
        errs.password = ('OH NO, PASSWORD INCORRECT!');
    } else {
        delete errs.username;
        delete errs.password;
    };
    if (Object.keys(errs).length == 0) { 
        //the following was taken from Lab15 ex4.js
        //add username to user's session
        session.username = loginusername 
        //sets the time of login
        var theDate = Date.now();
        //remember this login time in session
        session.last_login_time = theDate;
        //set login name to the name saved for user
        var login_name = userinfo['name'];
        //set email to the email saved for user
        var user_email = userinfo['email'];
        //gives username in cookie
        res.cookie('username', login_username)
        //gives name in cookies
        res.cookie('name', login_name)
        //gives a cookie to user
        res.cookie('email', user_email);
        //give response parsed as json object
        res.json({});
    } else {
        //otherwise, show error message
        res.json(errs);
    };

});

// Registration Page server side starts now
app.post('/register_user', function(req, res) {
    errs = {};
    var registeredusername = req.body["username"];
    var registeredname = req.body["name"];
    if (registeredusername =='') {
        errs.username ='PLEASE ENTER A USERNAME';
    } else if (registeredusername.length < 4 || registeredusername.length > 10) {
        errs.username = 'USERNAME MUST BE BETWEEN 4-10 CHARACTERS';
    } else if (isAlphaNumeric(registeredusername) == false) {
        errs.username = 'USERNAME IS TAKEN';
    } else {
        errs.username = null
    }
    
    if (registeredname.length > 30) {
        errs.name = 'NAME TOO LONG, MAX: 30 CHARACTERS';
    } else {
        errs.name = null;
    }
    
    if (req.body.password.length == 0) {
        errs.password = 'ENTER A PASSWORD';
    } else if (req.body.password.length <= 5) {
        errs.password = 'MUST BE AT LEAST 6 CHARACTERS';
    } else if (req.body.password != req.body,repeatpassword) {
        errs.password = null;
        errs.repeatpassword = 'PASSWORDS DO NOT MATCH';
    } else {
        delete errs.password;
        errs.repeatpassword = null;
    }

    if (req.body.email == '') {
        errs.email = 'ENTER A EMAIL PLEASE';
    } else if (ValidateEmail(req.body.email) == false) {
        errs.email = 'PLEASE ENTER A VALID EMAIL';
    } else {
        errs.email = null;
    }

    let result = !Object.values(errs). every(o=>o == null);
    console.log (result);
    if (result == false) {
        userdata[registeredusername]= {};
        userdata[registeredusername].name = req.body.name;
        userdata[registeredusername].password = req.body.password;
        userdata[registeredusername].email = req.body.email;
        fs.writeFileSync(filedata, JSON.stringify(userdata, null, 2));
        res.cookie("username", registeredusername);
        res.cookie("name", registeredname);
        res.cookie("email", req.body.email);
        res.json({});
    } else {
        res.json(errs);
    }
});

    




app.use(express.static('./static')); // creates static server using express from the static folder
app.listen(8080, () => console.log(`listening on port 8080`));