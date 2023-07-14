const fs = require('fs');

const CreateRequiredDirectories = (outPath) => {
    try {

        if(createDirectory("data")){
            createDirectory("./data/chalans");
            createDirectory("./data/items");
            return true;
        }
        
    } catch (error) {
        return false;
    }
  
}


const createDirectory = (outPath) => {
    try {
        if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath)
        }
        return true;
    } catch (error) {            
        return false
    }
}

const deleteDirectory = (outPath) => {

    try {
        if (fs.existsSync(outPath)) {
            fs.readdirSync(outPath).forEach((file, index) => {
              const curPath = path.join(outPath, file);
              if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
              } else {
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(outPath);
        }
        return true;
    } catch (error) {   
        return false
    }

}

const deleteFile = async (outPath) => {

    try {
        let fsResponse = fs.existsSync(outPath)
        if(fsResponse){
           return fs.unlinkSync(outPath);
        }else{
           return true;
        }
    } catch (error) {   
        return false
    }

}

const createFile = (outPath) => {


}


module.exports = {
    deleteDirectory,
    createDirectory,
    CreateRequiredDirectories,
    deleteFile
}