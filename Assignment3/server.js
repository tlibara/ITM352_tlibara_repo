var express = require('express'); // loads the express module
var app = express(); // sets and starts the app module
var myParser = require("body-parser"); // loads the bpdy-parser module
var productdata = require('./static/products_data.js'); // Links the products page file and sets the the variable to 'data
//var allproducts = data.allproducts; // loads the products page to the variable 'products'
var filedata = './user_data.json'; // new variable to the user data file 
var fs = require('fs'); // loads the file system

//userdata =JSON.parse(userdatafile);
var session = require('express-session'); // require express-session module to transfer data to the body
var cookieParser = require('cookie-parser'); // require cookie parser and the session variable is set for the session module

const qs = require('qs'); // makes qs as the loaded query string module
const { request } = require('express');
const nodemailer = require("nodemailer"); // require the node mailer module
//const { send } = require('process');

app.use(cookieParser()); // use cookie-parser middleware
app.use(myParser.urlencoded({ extended: true })); // get the data in the body
app.use(session({secret: "ITM352 rocks!"})); // sets up the use of sessions automatically
app.use(myParser.json());


if (fs.existsSync(filedata)) {
    var filestats = fs.statSync(filedata); // gets the stats from the file
   // var userdata = JSON.parse(fs.readFileSync(userdatafile,'utf-8'));
    console.log(`user_data.json has ${filestats["size"]} characters`); // outputs the characters of the data file

    var userdatafile = fs.readFileSync(filedata, 'utf-8'); // open data file and assign from userdata to a string variable
    userregdata = JSON.parse(userdatafile)
} 

app.all('*', function (req, res, next) { // for all the request methods
    console.log(req.method + ' to ' + req.path); // how the request method gets written in the console and path
    next(); // continue on

app.post("/processlogin", function (req, res) {
    POST = req.body;
    if (typeof userregdata[req.body.username] != 'undefined') {
        if (req.body.password == userregdata[req.body.username].password){
            if (typeof req.session.login === 'undefined') {
                req.session.login = {};
            }
            if (typeof req.session.login.username == 'undefined') {
                req.session.login.username = [POST.username];
            }
            if (typeof req.session.login.password == 'undefined') {
                req.session.login.password = [POST.password]
            }
            console.log(req.session);
            
            var useremail = userregdata[req.body.username].email;

            res.cookie('username', POST.username);
            res.cookies('email', useremail);
            res.redirect("./login.html");

        } else {
            res.send (`OH NO, INCORRECT PASSWORD`)
        } 
    } else {
        res.send(`OH NO, ${filedata} DOES NOT EXIST!`);
    } 
});

// Registration Page server side starts now
app.post('/processregistration', function(req, res) {
    let POST = req.body;
    var errs = [];
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

app.post("/add_to_cart", function (req, res) {
    
    var POST = req.body
    console.log(POST);

    //check if quantity is valid, if so add to session, otherwise return error
    
    has_errors = false;
    qty = POST[`quantity`];
    if (qty != '' && isNonNegIntString(qty) == true) {


        if (has_errors == false) {
            if (typeof req.session.cart == 'undefined') {
                req.session.cart = {};
            }
            if (typeof req.session.cart[POST.product] == 'undefined') {
                req.session.cart[POST.product] = [];
            }
            req.session.cart[POST.product][POST.product_index] = Number.parseInt(POST.quantity);
            response_msg = `Added ${POST.quantity} to your cart!`;
        }
        response_msg = `Added ${POST.quantity} to your cart!`;
        console.log(request.session);
        res.json({"message":response_msg});

} else {

        has_errors = true;
        console.log("errors");
        ;
        
    };
   
    
});

app.post("/get_cart_data", function (req, res) {
    if (typeof req.session.cart == 'undefined') {
        req.session.cart = {};
    }
    res.json(req.session.cart);
});

app.post("/get_login_data", function (req, res) {
    if (typeof req.session.login == 'undefined') {
        req.session.login = {};
        console.log(req.session.login)
    }
    res.json(req.session.login);

});

app.post("/generateinvoice", function (req, res) {
    console.log(req.session.cart);

    if (typeof req.session.login == 'undefined') {
        alertstr = `<script> alert("LOGIN OR REGISTER!");
                        window.history.back() </script>`;

            res.send(alertstr);
           
        
    }
    res.redirect("./invoice.html")
});

app.post("/completeorder", function (req, res) {
    var useremail = request.cookies.email;
    var invoicestr = `THANK YOU ${useremail} FOR PURCHASING MAKEUP FROM OUR STORE`;

    var shoppingcart = req.session.cart;
    for(product in productdata) {
        for(i = 0; i < productdata[product].length; i++) {
            if(typeof shoppingcart[product] == 'undefined') continue;
            qty = shoppingcart[product][i];
            if(qty > 0) {
              invoicestr += `<tr><td>${qty}</td><td>${productdata[product][i].name}</td><tr>`;
            }
        }
    }
      invoicestr += '</table>';

    var transporter = nodemailer.createTransport({ 
        host: 'mail.hawaii.edu', //hawaii.edu USE HAWAII EMAIL
        port: 25,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });

    var useremail = req.cookies.email
    console.log(useremail);
    var mailOptions = {
        from: 'tlibara@hawaii.edu', 
        to: useremail, 
        subject: 'Invoice',
        html: invoicestr 
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            invoicestr += 'ERROR, INVOICE COULD NOT BE SENT';
        } else { 
            invoicestr += `YAY, INVOICE WAS SENT TO ${useremail}`;
        }
        res.send (invoicestr);
    });
})

app.post('/logout', function (req, res) {
    req.session.destroy();
    res.clearCookie("username");
    res.clearCookie("email");
    res.redirect ('/index.html');
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
// Referenced from Professor Port's Assignment 1 examples
function checkQuantityTextbox(theTextbox) { // Checks the textbox from the isNonNegInt function
    errs = isNonNegInt(theTextbox.value, true); // Refers to the isNonNegInt function to see if true or false
    if (errs.length == 0) errs = ['Quantity']; // Adjusts the quantity to the customers request
    if (theTextbox.value.trim() == '') errs = ['Quantity'];
    document.getElementById(theTextbox.name + 'label').innerHTML = errs.join(", ");
  }
  



    




app.use(express.static('./static')); // creates static server using express from the static folder
app.listen(8080, () => console.log(`listening on port 8080`))});