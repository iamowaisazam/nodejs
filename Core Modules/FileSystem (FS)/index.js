const fs = require('fs');

//Delete Directory
const deleteFolderRecursive = function (outPath) {
    if (fs.existsSync(outPath)) {
        fs.readdirSync(outPath).forEach((file, index) => {
          const curPath = path.join(outPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
           // recurse
            deleteFolderRecursive(curPath);
          } else {
            // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(outPath);
      }
};

//CheckDiretory
fs.existsSync(outPath)

//Create Directory
fs.mkdirSync("Owais")

//delete
fs.rmdirSync(outPath);

//Delete File
fs.unlinkSync(curPath);    


//Create File
fs.writeFileSync('Owais/intro.txt','Wellcome To Owais Azam');
fs.appendFileSync("Owais/intro.txt",' Ok Done');
const buffr = fs.readFileSync("Owais/intro.txt")
