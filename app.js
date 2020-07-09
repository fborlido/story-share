const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

//load config
dotenv.config({ path: './config/config.env' });

connectDB();

// View Engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));