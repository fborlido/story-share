const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
var exphbs  = require('express-handlebars');

const app = express();

//load config
dotenv.config({ path: './config/config.env' });

connectDB();

// View Engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Body Parser
app.use(express.urlencoded({extended: false}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));