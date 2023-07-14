const fs = require('fs');
const { deleteDirectory,createDirectory } = require("./Directory");
const reader = require('xlsx')


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
             var newWB = reader.utils.book_new()
             var newWS = reader.utils.json_to_sheet(element.chalanItem);
             reader.utils.book_append_sheet(newWB,newWS,"name")
             reader.writeFile(newWB,"./data/chalans/"+element.chalan_number+".xlsx")            
        });

        console.log('Challans Generated Successfully');

        return true;
        
    } catch (error) {
      return false;   
    }

}

module.exports = {
    generateChallan,
}