let express = require('express');
let proxy = require('http-proxy-middleware');
let app = express();

let bodyParser = require('body-parser');

let jsonParser = bodyParser.json()

app.use('/api/real', proxy({target: 'http://0.0.0.0:5001', changeOrigin: true}));
app.use('/', proxy({target: 'http://0.0.0.0:8000', changeOrigin: true}));

app.listen(3000);
