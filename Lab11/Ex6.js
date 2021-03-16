function isNonNegInt(q,returnErrors=false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0); 
}

name = "Toni-Lynn";
age = 20;

attributes  =  name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
pieces = attributes.split(';');

for (i in parts) {
    parts [i] = `${typeof parts[i]} ${parts[i]}`;
}


for(part of parts) {
    console.log(isNonNegInt(part, true));
}
function checkIt (part,index) {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}

pieces.forEach((item,index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
} ) 