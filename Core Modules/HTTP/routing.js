const http = require("http");



const server = http.createServer((req,res) => {


    switch (req.url) {
        case "/":
            
            res.end("Home");
            break;

        case "/about":
            
           res.end("about");
            break;
    


        default:
            
            res.end("404");
            break;
    }
   
});


server.listen(400,() => {

    console.log("app Listen.....");
});
