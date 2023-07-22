const fs = require('fs');
const { deleteDirectory,createDirectory } = require("./Directory");
const reader = require('xlsx')
const xlsx = require('xlsx-populate');
const testChallan = require('./testChallan');
const { challanExample, challan_format } = require('../utilities/challan');




 const customizeChallan = async () => {

  console.log('test');

        const data = [
            {
                id:1,
                title:"Title",
                name:"Name",
                date:"1/2/2023"
            },
            {
                id:2,
                title:"Title",
                name:"Name",
                date:"1/2/2023"
            },
        ];
        
        var newWB = reader.utils.book_new();

        // The data that will be added to the sheet
        let worksheetData = {
           
            'A1': {
                t: 's',
                v: 'Sky Kids Wear',
            },
            'A2': {
                t: 's', 
                v: 'Test String!',
            },
            'A3': {
                t: 's', 
                v: 'Test String!',
            },
            'A4': {
                t: 's', 
                v: 'Test String!',
            },
            'B1': {
                t: 's',
                v: 'Test String 2!',
            },
        };
   
        reader.utils.book_append_sheet(newWB,worksheetData,"name")
        reader.writeFile(newWB,"./test.xlsx");   

 }



const generateChallan = async () => {

    try {

        await fs.rmSync("./data/chalans", { recursive: true, force: true });
        await  createDirectory("./data/chalans");

        const sets = new Set();	
        const data = JSON.parse(fs.readFileSync("./data/db.json"));
        const convert = data.map((c) => sets.add(String(c.challan_id)));
        let chalans = [];

        sets.forEach((item) => {
            let fname = null;
            let currentChalan = [];
            data.forEach(element => {
                if(item == String(element.challan_id)){
                    fname = element.filename;
                    currentChalan.push(element);
                }
            });
            chalans.push({
                "chalan_number":item,
                "file_name":fname,
                "count":currentChalan.length,
                chalanItem:currentChalan
            })
        });
        chalans.forEach(element => {
           
            console.log(element);
            // var newWB = reader.utils.book_new()
            //  var newWS = reader.utils.json_to_sheet(element.chalanItem);
            //  reader.utils.book_append_sheet(newWB,newWS,"name")
            //  reader.writeFile(newWB,"./data/chalans/"+element.chalan_number+".xlsx")            


        });
        console.log('Challans Generated Successfully');
        return true;
        
    } catch (error) {
        console.error('Error generateChallan');
      return false;   
    }

}



const export_challan = async () => {

    
    xlsx.fromBlankAsync().then(async(workbook) => {

            let format = await challan_format(challanExample);
            let length = format.length;
            await workbook.sheet("Sheet1").cell("A1").value(format)
            await workbook.sheet(0).range("A1:I1").style({
                bold:true,
                italic: true,
                fontSize:20,
                fontColor: 'ffffff',
                fill:"000000",
                horizontalAlignment: "center", 
                verticalAlignment: "center", 
            }).merged(true);

            await workbook.sheet(0).range("A2:I2").style({
                bold:true,
                horizontalAlignment: "center", 
                verticalAlignment: "center", 
            });

            await workbook.sheet(0).range(`A3:I${length - 1}`).style({
                horizontalAlignment: "center", 
                verticalAlignment: "center", 
            });

            await workbook.sheet(0).range(`A${length}:G${length}`).style({
                bold:true,
                horizontalAlignment: "right", 
                verticalAlignment: "center", 
            }).merged(true);

        return workbook.toFileAsync("result.xlsx");
   
    });

}



module.exports = {
    generateChallan,
    customizeChallan,
    export_challan
}