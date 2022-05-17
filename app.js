
// const http = require("http");
// const fs = require("fs");
 
// http.createServer((req, res) => {
      
//      if (req.url === "/user") {
         
//         let data = "";
//         req.on("data", chunk => {
//             data += chunk;
//         });
//         req.on("end", () => {
//             console.log(data);
//             res.end("Данные успешно получены");
//         });
//     }
//     else{
//         fs.readFile("index.html", (e, data) => res.end(data));
//     }
// }).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));

// solution 2

const http = require("http");
const fs = require("fs");
 
http.createServer(async (request, response) => {
      
     if (request.url === "/user") {
         
        const buffers = []; // буфер для получаемых данных
 
        for await (const chunk of request) {
            buffers.push(chunk);        // добавляем в буфер все полученные данные
        }
 
        const data = Buffer.concat(buffers).toString();
        console.log(data);
        response.end("Данные успешно получены");
    }
    else{
        fs.readFile("index.html", (error, data) => response.end(data));
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));