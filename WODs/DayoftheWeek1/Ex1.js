day = 20;
month = 'September';
year = 2000;

step1 = year;
step2 = parseInt(step1/4);
step2 = step2 + step1;
step3 = parseInt(step1/100);
step3 = step2 - step3;
step4 = parseInt(step1/400);
step4 = step4 + step3;
step5 =step4 + day;
var monthkey = {
    'January': 0,
    'February': 3,
    'March' : 2,
    'April' : 5,
    'May' :	0,
    'June' : 3,
    'July':	5,
    'August': 1,
    'September': 4,
    'October': 6,
    'November':	2,
    'December':	4
};
step6 = step5 + (monthkey[month]);
step7 = step6%7;

var daysoftheweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

console.log(month + ' ' + day + ',' + ' ' +  year + ' ' + daysoftheweek[step7]);