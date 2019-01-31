const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const api = require('./routes');
const app = express();


const mongoose = require('mongoose');
const dev_db_url = 'mongodb://vitalii:V1talik0@ds125302.mlab.com:25302/tc-task';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);

const port = 4040;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
