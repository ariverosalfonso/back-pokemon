const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use(require('./routes/pokemon'));

//Start the server 
app.listen(app.get('port'), () =>{
    console.log(`server on ${app.get('port')}`);
})