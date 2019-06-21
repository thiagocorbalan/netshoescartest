const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:2012',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));


app.listen(1977);
