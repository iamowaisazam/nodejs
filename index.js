const prompt = require('prompt-sync')({sigint: true});
var process = require('process');
const Commands = require('./controller/Command');
const {CreateRequiredDirectories, createDirectory} = require("./controller/Directory");
const { generateJson } = require('./controller/Transection');
const { generateChallan, customizeChallan, export_challan } = require('./controller/Chalan');
const Config = require('./controller/Config');
const http = require("http");
const fs = require('fs');
const xlsx = require('xlsx-populate');



( async () => {

      export_challan();

    

      // xlsx.fromBlankAsync().then(async(workbook) => {

      //       let data = await challan_format();

      //       await workbook.sheet("Sheet1").cell("A1").value(data)

      //       await workbook.sheet(0).range("A1:I1").style({
      //             bold:true,
      //             italic: true,
      //             fontSize:20,
      //             fontColor: 'FF0000',
      //             fill:"0000ff",
      //             horizontalAlignment: "center", 
      //             verticalAlignment: "center", 
      //       }).merged(true);

      //      return workbook.toFileAsync("result.xlsx")
      // });

      // await CreateRequiredDirectories();
      // console.log(await generateJson());

      // customizeChallan();
      
 })();
 


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

//  process.once('exit', () => {
//    console.log('Application Closed Successfully');
//    createDirectory("Closed");
//  });


