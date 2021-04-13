var express = require('express');
var app = express();
app.all('/xxx', function(req, res, next){
    console.log(req.method, req.path);
    next();
})
app.listen(8080);