const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
global.mongoose = require('mongoose');
const port = 3000;
const mongoHost = 'mongodb://sky:sky123@ds125616.mlab.com:25616/skytest';
const app = express();
const routes = require('./routes');
const bodyparser = require('body-parser');

mongoose.connect(mongoHost, { useNewUrlParser: true });

const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  methods: "GET,POST",
};

app.use(bodyparser());
app.use('/', routes);
app.use(cors(options));
app.use(helmet());
app.listen(port, () => console.log('Server running'))
