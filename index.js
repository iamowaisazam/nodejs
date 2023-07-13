const reader = require('xlsx')
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');


var currentPath = process.cwd();
const dataPath = "./SKY AGE/EARLY/";
let outPath = "./output";
const transectionsPath = "./output/transections.json";
const storeChalanPath = "./output/chalans/";



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


const converObjectToLower = function (res) {
    let output = {};
    for (let x in res) {
        const newKey = x.replace(/ /g, '').toLowerCase();
        output[String(newKey)] = res[x];
    }
    return output;
}

const GetData = async function (){

        deleteFolderRecursive(outPath);
      
          fs.readdir('./SKY AGE/EARLY', (err, files) => {

                    let data = [];
                    files.forEach(file => {
                    
                            let exname = dataPath+file;
                            const excel = reader.readFile(exname);
                            const sheet_name = "YEARLY";
                            const temp = reader.utils.sheet_to_json(excel.Sheets[sheet_name])
                            temp.forEach( async (res) => {
                                if(res['C.NO']){
                                    let output = converObjectToLower(res);
                                    let obj = {
                                        "filename":file,
                                        "cno":output['c.no'],
                                        "date":output['date'],
                                        "item_name":output['nemeofiteme'],
                                        "code":output['cod'],
                                        "lno":output['l.no'],
                                        "pes":output['pes'],
                                        "rate":output['rate'],
                                        "amount":output['amount'],
                                        "size":output['size']
                                    };
                                    data.push(obj);
                                    // console.log(data);
                                } 
                            });
                            
                    });


                fs.mkdirSync("output")
                fs.writeFileSync('output/transections.json',JSON.stringify(data));
                var newWB = reader.utils.book_new()
                var newWS = reader.utils.json_to_sheet(data)
                reader.utils.book_append_sheet(newWB,newWS,"name")//workbook name as param
                reader.writeFile(newWB,"./output/sample.xlsx")

             });
           
}



const generateChallan = () => {

       deleteFolderRecursive(storeChalanPath);

       fs.mkdirSync(storeChalanPath);
        const sets = new Set();	
        const data = JSON.parse(fs.readFileSync(transectionsPath));
        const convert = data.map((c) => sets.add(Number(c.cno)));
        let chalans = [];

        sets.forEach((item) => {
            let fname = null;
            let currentChalan = [];
            data.forEach(element => {
                if(item == Number(element.cno)){
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
             var newWB = reader.utils.book_new()
             var newWS = reader.utils.json_to_sheet(element.chalanItem);
             reader.utils.book_append_sheet(newWB,newWS,"name")
             reader.writeFile(newWB,storeChalanPath+element.file_name+"-"+element.chalan_number+".xlsx")            
        });

}


generateChallan();