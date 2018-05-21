var express = require('express');
var app = express();

//Dropbox variables and dependencies
var fs = require('fs');
require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'yXENnI3OBYgAAAAAAAAM-L2uNBSkYlq6HtfHiZXCUKuyA9EaNs5yWbU7tANOLOo3' });

app.use(express.static(__dirname +'./../../')); //serves the index.html

//Routes
//Get list of all uploaded files
app.get('/list', function(req, res) {
    dbx.filesListFolder({path: ''})
        .then(function(response) {
            res.json(response);
        })
        .catch(function(error) {
            res.json(error);
        });
});
//Get temporary download link for a single file
app.get('/download/:path', function(req, res) {
    var path = '/' + req.params.path;
    dbx.filesGetTemporaryLink({path: path})
    .then(function(data) {
      res.json(data.link)
    })
    .catch(function(error) {
      console.error(error);
    });
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/