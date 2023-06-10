const http = require("http");



const server = http.createServer((req,res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    
    console.log(req);

    res.end("Hello");

});


server.listen(400,() => {

    console.log("app Listen.....");
});
