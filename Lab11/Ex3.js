attributes = "Toni-Lynn;20;MIS";
parts = attributes.split(';');
console.log(parts); 

name = "Toni-Lynn";
age = 20;

attributes  =  name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
pieces = attributes.split(';');
for (i in parts) {
    parts [i] = `${typeof parts[i]} ${parts[i]}`;
}

console.log(parts.join(","));