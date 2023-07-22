const fs = require('fs');
const { deleteFile } = require('./Directory');
const reader = require('xlsx')


const readData = async (path) => {
    try {

        let data = [];
        const readdir = await fs.readdirSync(path);
        readdir.forEach(file => {
                let exname = path+"/"+file;
                const excel = reader.readFile(exname);
                const sheet_name = "YEARLY";
                const temp = reader.utils.sheet_to_json(excel.Sheets[sheet_name])
                temp.forEach( async (res) => {
                    if(res['C.NO']){
                        let filterData = await seFileds(res,file);
                        data.push(filterData);
                    } 
                });
        });
        return data;
        
    } catch (error) {
        console.log("error readData");
        return false;
    }
      
};


const generateJson = async (path) => {

    try {
        
          await deleteFile("./data/db.json");    
          let data = await readData(path);
          await saveIntoJson(data)
          return true;
        
    } catch (error) {
        console.log("error generateJson");
        return false;
    }

}

const saveIntoJson = async (data) => {
    try 
    {
        fs.writeFileSync('./data/db.json',JSON.stringify(data));
        return true;
    } catch (error) {
        console.log("error saveIntoJson");
        return false;
    }
}


const seFileds = async (res,file) => {

    try {

        let output = converObjectToLower(res,file);
   
        let month = Number(output.date.split('.')[1]);
        let year = output.date.split('.')[2];
        let challan = Number(output['c.no']); 
        let chalanId = "CL-"+challan+"-"+year+"-"+month;

        let obj = {
            "challan_id":chalanId,
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
        return obj
        

    } catch (error) {
        console.log("error Setfiled");
        return false;
    }

        
}


const converObjectToLower = function (res) {
    let output = {};
    for (let x in res) {
        const newKey = x.replace(/ /g, '').toLowerCase();
        output[String(newKey)] = res[x];
    }
    return output;
}



module.exports = {
    generateJson
}