const express = require('express');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const path = require('path');

const PORT = 8080;
const app = express();

const router = require('./routes/handlers.js');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
