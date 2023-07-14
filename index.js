const prompt = require('prompt-sync')({sigint: true});
var process = require('process');
const Commands = require('./controller/Command');
const {CreateRequiredDirectories, createDirectory} = require("./controller/Directory");
const { generateJson } = require('./controller/Transection');
const { generateChallan } = require('./controller/Chalan');
const Config = require('./controller/Config');
const http = require("http");






// ( async () => {
//    console.log(await Config.get());
//  })();
 


 const init = async () => {
      
      await Config.create()

      console.log('Hi Welcome To Sky Kids Wear.');

      const responseDirectories = await CreateRequiredDirectories();
      if(!responseDirectories){
      }

      const resgenerateJson = await generateJson('./SKY AGE/EARLY');
      if(!resgenerateJson){
      }
      console.log('Data Found In "/Sky Age/Early" and Imported Successfully.');



      Commands.showCommands();
      let close = false;
      while (!close) {
            let input = prompt('Comand: ');
            close = await Commands.handle(input)
      }
}

// init();

 process.once('exit', () => {
   console.log('Application Closed Successfully');
   createDirectory("Closed");
 });



 const server = http.createServer((req,res) => {
      res.end("Hello");

      
});
server.listen(400,() => {
    console.log("Server Started Successfully");
});
