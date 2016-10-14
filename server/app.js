const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/pic-translate';


const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
require('dotenv').load();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware');

// DB CONNECT
require('mongoose').connect(MONGO_URI, err => {
  if(err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`);
});

const app = express();
const server = http.createServer(app);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('src'));

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  let indexPath = path.join(__dirname, '../src/index.html')
  res.sendFile(indexPath);
});

server.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
