const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);
  
    if (req.method == 'GET') {
      var fileUrl;
      if (req.url == '/')
          {fileUrl = '/index.html'}
      else
          {fileUrl = req.url}
  
      var filePath = path.resolve('./public'+fileUrl);
      // changes specified path into absolute path
      const fileExt = path.extname(filePath);
      if (fileExt == '.html') {
        // checks if fileEXt matches
        fs.exists(filePath, (exists) => {
          if(!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          // This line opens the file as a readable stream
          // This just pipes the read stream to the response
          //  object (which goes to the client)
        })
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
      }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
  })
  

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});