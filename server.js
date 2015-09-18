var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = '9000';

var mimes = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript",
    ".gif" : "image/gif",
    ".jpg" : "image/jpg",
    ".png" : "image/png",
    ".json": "application/json"
}

var server = http.createServer(function(req, res) {
    var filePath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mimes[path.extname(filePath)];

    // Check to see if the file exists or not
    fs.exists(filePath, function(file_exists) {
        if(file_exists) {
            
            // Read and Serve in a more Efficient way using Streams
            res.writeHead(200, { 'Content-Type' : contentType});
            var streamFile = fs.createReadStream(filePath).pipe(res);
            
            //Uncomment to run a example .json file in the browers.
            /*
            var obj = {
                firstname: 'John',
                lastname: 'Doe'
            };
            
            res.end(JSON.stringify(obj));
            */

            // event listener for possible errors
            streamFile.on('err', function() {
                res.writeHead(500);
                res.end();
            })

        }else {
            res.writeHead(404);
            res.end("Sorry we could not find the file you requested!");
        }
    })

}).listen(port, host, function(){
    console.log('Server Running on http://' + host + ':' + port);
})
