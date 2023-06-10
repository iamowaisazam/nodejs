const fs = require('fs');

fs.mkdirSync("Owais")
fs.writeFileSync('Owais/intro.txt','Wellcome To Owais Azam');
fs.appendFileSync("Owais/intro.txt",' Ok Done');
const buffr = fs.readFileSync("Owais/intro.txt")


console.log(buffr.toString());