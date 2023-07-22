const { generateChallan } = require('./Chalan');
const Config = require('./Config');


const myCommands = [
     {
        "title":"Generate Challans",
     },
     {
        "title":"Generate PDF",
     },
     {
        "title":"Show Config",
     },
     {
        "title":"Exit",
     } ,
     {
        "title":"Help",
     } 
];


const showCommands = async () => {
    console.log('________________________________________________');
    myCommands.forEach((element,key) => {
        console.log(`${key+1}.${element.title}`);
     });
}

const handle = async (cmd) => {

    switch (cmd) {
        case 'Generate Challans':
            //  if(await generateChallan()){
                // console.log("Challans Generated Successfully");
            //  }

             console.log(await generateChallan());
            break;

        case 'Generate PDF':
            console.log(`Pressed ${cmd}`);
            break;

        case 'Show Config':
                console.log(await Config.get());
            break;

        case 'Help':
            showCommands();         
            break; 

        case 'Exit':
          
            return true;            
            break;
           
        default:
            console.log(`Invalid Command ${cmd}`);
            break;
    }

    return false;

};




module.exports = {
    showCommands,
    handle
}