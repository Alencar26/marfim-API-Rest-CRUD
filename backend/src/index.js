//IMPORTES
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// usando funcionalidades do express
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);