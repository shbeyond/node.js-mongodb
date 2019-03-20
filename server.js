var dbFun = require("./database/mongodb");
const { insertOneData, findData, upDateData, deleteOneData, deleteManyData } = dbFun;
var
    http = require('http'),
    fs = require('fs');

var server = http.createServer(function(request, response) {
    var url = request.url;
    switch (url) {
        case "/data"://查找
            var findWord = { "name": "留清" };
            findData("site", findWord, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                response.end(JSON.stringify(data));
            });
            break;
        case "/data/insert"://插入
            var findWord = { "lang": "100cm" };
            insertOneData("site", findWord, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                findData("site", findWord, function(data) {
                    response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                    response.end(JSON.stringify(data));
                });
            });
            break;
        case "/data/update"://更新
            var findWord = { "lang": "100cm" };//查询条件
            var updateStr = { $set: { "url": "444" } };
            upDateData("site", findWord, updateStr, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
            });
            findData("site", { "url": "444" }, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                response.end(JSON.stringify(data));
            });
            break;
        case "/data/deleteOne"://删除一个
            var findWord = { "url": "444" };
            deleteOneData("site", findWord, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
            });
            findData("site", { "url": "444" }, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                response.end(JSON.stringify(data));
            });
            break;
        case "/data/deleteMany"://删除多个
            var findWord = { "name": "留清" };
            deleteManyData("site", findWord, function(data) {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                response.end(JSON.stringify(data));
            });
            break;

        default:
            fs.readFile('./index.html', function(err, data) {
                if (!err) {
                    response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                    response.end(data);
                } else {
                    throw err;
                }
            })
            break;
    }
});
// exports.server=server;
server.listen(8080);
