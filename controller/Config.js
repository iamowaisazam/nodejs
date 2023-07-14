const fs = require('fs');

const fields = [{
    "output_folder_name":"Demo",
}];


const get = async () => {   

    const dir = await fs.readdirSync('./');
    if(dir.includes('config.json')){

        const resposne = await JSON.parse(fs.readFileSync("./config.json"));
        return resposne[0];

    }else{
        await create();
        return await get();

        // get();
        
    }
}


const create = async () => {
    try {

        const dir = await fs.readdirSync('./');
        if(!dir.includes('config.json')){
            fs.writeFileSync('./config.json',JSON.stringify(fields));
        }

    } catch (error) {
        console.log('Error Create Config');
        return false;
    }
}


module.exports = {
    create,
    get
}