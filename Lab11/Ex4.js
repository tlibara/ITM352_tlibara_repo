function isNonNegInt(check,returnErrors=false) {
    errors = []; // assume no errors at first
    if(Number(check) != check) errors.push('Not a number!'); // Check if string is a number value
    if(check < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(check) != check) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0); 
}



attributes = "Toni-Lynn;20;MIS";
parts = attributes.split(';');

for(part of parts) {
    console.log(isNonNegInt(part, true));
}

// console.log(parts);

 