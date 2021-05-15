// Author: Toni-Lynn Ibara
// Date: 5-14-2021
// Server file
// Referenced: Dan Port(Lab 13-15) and Tyler Johnson(Assignment2)

var express = require('express'); // loads the express module
var app = express(); // sets and starts the app module
var myParser = require("body-parser"); // loads the bpdy-parser module
var queryString = require('query-string');
var data = require('./static/products_data.js'); // Links the products page file and sets the the variable to 'data
const qs = require('qs'); // makes qs as the loaded query string module
var products = data.products; // loads the products page to the variable 'products'
var filename = 'user_data.json'; // new variable to the user data file 
var fs = require('fs'); // loads the file system
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session'); // loads sessions
const nodemailer = require("nodemailer"); // required to send to mailer

// play with coookies
app.get('/set_cookie', function (req, res, next) {
    // console.log(request.cookies);
    let my_name = 'Toni-Lynn Ibara';
    //res.clearCookie('my_name');
    //now = new Date();
    res.clearCookie('my_name');
    res.send(`Cookie for ${my_name} sent`);
    next();
});

// use with cookies
app.get('/use_cookie', function (req, res, next) {
    //console.log(req.cookie);
    if (typeof req.cookies["username"] != 'undefined') {
        //let username = req.cookies["username"];
        //res.cookie('username', username, {"maxAge": 10*1000});
        res.send(`${req.cookies["username"]} is logged in!`)
    } else {
        res.send("You are not logged in!");
    }
    next();
});

// loads the session
app.use(session({secret: "ITM352 rocks!"}));

if (fs.existsSync(filename)) {
    var filestats = fs.statSync(filename); // gets the stats from the file
    console.log(`${filename} has ${filestats["size"]} characters`); // outputs the characters of the data file
    var data = fs.readFileSync (filename, 'utf-8');
    var user_data = JSON.parse(data);
} else {
    console.log(`${filename} does not exist`)
}

app.all('*', function (req, res, next) { // for all the request methods
    console.log(req.method + ' to ' + req.path); // how the request method gets written in the console and path
    next(); // continue on
});

if(fs.existsSync(filename)) {
    var data = fs.statSync(filename);
    data = fs.readFileSync(filename, 'utf-8');
    var user_data = JSON.parse(data);
} else {
    console.log(`${user_data} does not exist!`);
    exit();
}

// repeats the function from the products_display.html to create a relation between the two pages
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q=='') q=0;
    if (Number(q) != q) errors.push('NOT A NUMBER!'); // Check if string is a number value
    if (q < 0) errors.push('NEGATIVE VALUE!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('NOT AN INTEGER!'); // Check that it is an integer

    return return_errors ? errors : (errors.length == 0);
}

app.use(myParser.urlencoded({ extended: true })); // get the data in the body
app.use(myParser.json()); // add the json parse to parse json data
app.post("/process_form", function (req, res) { // if we recieve a request, it will process this form as the response
    params = req.body; // set body of form we previously set in our home page to params

    if (typeof params['purchasesubmit'] != 'undefined') { // run code if something was not undefined
        has_errors = false; // believe that everything is valid from the start
        total_qty = 0; // check if a quantity was inputted to see if the total > 0
        for (i = 0; i < products.length; i++) {
            if (typeof params [`quantity${i}`] != 'undefined') { // run code if the quantity was undefined
                a_qty = params[`quantity${i}`];
                total_qty += a_qty; // setting the values of the quantitiy
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // alerts that there is an invalid quantity
                }
            }
        }

        if (typeof params["purchasesubmit"]) { // respond or redirect to invoice if everything checked out
            if (has_errors) {
                res.redirect(`./index.html? ${qs.stringify(params)}`); // send customer back to home page instead of displaying an error message
            } else if (total_qty == 0) {
                res.redirect(`./index.html?${qs.stringifty(params)}`); // if no quantity was selected, redirect to index page
            } else { // everything is good to go
                req.session[cartfile] = `${qs.stringify(params)}`;
                if (typeof req.cookies["username"] != 'undefined') {
                    res.redirect(`./invoice.html?${qs.stringify(params)}`); // redirect to invoice page if everything is good
                } else {
                    res.redirect(`./login.html?${qs.stringify(params)}`); // redirect to login page if they did not login
                }
            }
        }
    }
});

// help from friend: Tyler Johnson
app.post("/addtocart", function (req, res) {
    console.log(req.body); // will request the body
    item_data = req.body; // will set the itemdata as the body
    if (isNonNegInt(item_data.quantity)){ // add data to cart if everything checks out with the function
        if (typeof req.session.cart == "undefined") {
            req.session.cart = {}; //create a cart if there is none
        }
        if (typeof req.session.cart[item_data.product_type] == "undefined") {
            req.session.cart[item_data.product_type] = []; // create a product array if there is none
        }
        if (typeof req.session.cart[item_data.product_type][item_data.product_index] == "undefined") {
            req.session.cart[item_data.product_type][item_data.product_index] = 0; // create an index of - if there is no product type, we will be able to add the product
        }
        req.session.cart[item_data.product_type][item_data.product_index] += parseInt(item_data.quantity); // parse quantity to an integer
        res.send (`ADDED ${item_data.quantity} ${item_data.product_type} TO YOUR CART!`); // validate that the quantitiy was added to the cart
        console.log(req.session.cart);
    } else {
        res.send(`INVALID QUANTITY`); // alert if there is a invalid quantity, if the isnonnegint function is true
    }

});

app.post("/loadcart", function (req, res) { // load cart to transfer cart data to server
    if (typeof req.session.cart == "undefined") { // create object if not created
        req.session.cart = {};
    }
    res.json(req.session.cart) // cart data as json response
});



app.get("/logout", function (req, res) { // logout function
    res.clearCookie('username'); // clear cookie that was required to login
    str = `<script>alert("${req.cookies['username']} is logged out"); location.href="./index.html";</script>`; // alert that the user logged out with their username and redirect to index page 
    res.send(str); //send variable
    req.session.destroy(); // destroys session with cart information
});

//process login- from professor port's lab 14 
app.post("/process_login", function (req, res) {
    var LogError =[]; // able to refer back to the array that holds errors
    var theusername = req.body.username.toLowerCase(); // look up the usernames in lowercase
    if (typeof user_data[theusername] != "undefined") { // if the username is matching our data base, then continue
        if (user_data[theusername].password == req.body.password) { // check if the password is in our database
            req.query.username = theusername;
            req.query.name = user_data[req.query.username].name
            res.cookie('username', theusername); // send cookie of username to the session
            res.redirect('./products_display.html?pkey=Ficus'); //send to products page once logged in successfully... data is in query string
            return;
        } else { // error message if something went wrong
            req.query.username = theusername; //username the customer inputted
            req.query.name = user_data[theusername].name; // double checking the name is the same
            req.query.LogError = LogError.join(';');
        }
    } else {
        LogError.push ('USERNAME INVALID'); // alert if username is invalid or doesn't exist
        req.query.LogError = LogError.join(';');
    }
    res.redirect('./login.html?' + queryString.stringify(req.query)); //redirect back to login apge if there is an error
});

// process registration
app.post('/process_register', function (req, res) {
    let POST = req.body; // request body of registration page
    var errors = []; // able to refer back to the array that holds errors
    if (/^[A-Za-z]+$/.test(POST['fullname'])) {
    } else {
        errors.push('ONLY USE LETTERS'); // only allow to have letters in the name
    }
    if ((/.{3,10}/.test(POST['username'])) && (/^[a-zA-Z0-9]*$/.test(POST['username']))) {
    } else {
        errors.push('USERNAME LENGTH: MIN 4 MAX 10'); // length not too short or too long
    }
    var reguser = POST['username'].toLowerCase();
    if (typeof user_data[reguser] != "undefined") {
        errors.push('USERNAME TAKEN'); // alert if the username is already in our database
    }
    if (POST['password'].length < 6) {
        errors.push('PASSWORD TOO SHORT'); // alert if the password is under 6 characters
    }
    if (POST['password'] == POST['repeatpassword']) {
    } else {
        errors.push('PASSWORDS DO NOT MATCH'); // alert if the two passwords are inputted differently
    }

    if (errors.length == 0) {
        var username = POST["username"]; // sets to refer back in the validation step
        user_data[username] = {}; // user input their credentials
        user_data[username].name = POST['username']; 
        user_data[username].password = POST['password'];
        user_data[username]. email = POST['email'];
        data = JSON.stringify(user_data); // converts to json file to be able to save it
        fs.writeFileSync(filename, data, "utf-8");
        theusername = user_data['name'];
        theemail = user_data[username]['email'];
        res.cookie("username", theusername).send; // send cookie to session
        res.redirect('./products_display.html?pkey=Ficus'); // redirect to products page to start shopping
    } 
    else {
        if (errors.length > 0) { // checking if any errors arise
            req.query.errors = errors.join (';'); // load error if there are any
            res.redirect('./register.html?' + qs.stringify(req.query)); // redirect to registration page
        }
    }
});

// referenced from friend
app.post("/checkout", function (req, res) {
    var user = req.cookies['username'];
    var invoice_str = decodeURI(req.body.invoicestring);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'makeupstoretoni@gmail.com',
            pass: 'tonimakeup'
        }
    });
    var user_email = user_data[user].email;
    var mailOptions = {
        from: 'makeupstoretoni@gmail.com',
        to: user_email,
        subject: 'INVOICE',
        html: invoice_str
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            invoice_str += 'OH NO, SOMETHING WENT WRONG';
        } else {
            invoice_str += 'EMAIL WAS SENT, THANK YOU FOR SHOPPING WITH US!';
        }
        req.session.destroy(); //destroys session
        res.send(invoice_str);
    });
});


app.use(express.static('./static')); // creates static server using express from the static folder
app.listen(8080, () => console.log(`listening on port 8080`));