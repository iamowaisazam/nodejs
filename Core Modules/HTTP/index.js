const http = require("http");



const server = http.createServer((req,res) => {

    console.log(req);

    res.end("Hello");

});


server.listen(400,() => {

    console.log("app Listen.....");
});
