const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bookings = require('./bookings');

const connection = mysql.createConnection({
  host     : 'ec2-18-222-86-148.us-east-2.compute.amazonaws.com',
  user     : 'newmysqlremoteuser',
  password : 'mypassword',
  database : 'bookingApp'
});

connection.connect( (err)=>{
    if(!err)
        console.log("Connection Successfulllllll");
    else    
        console.log("Connection Failed!!!")
        
    

});

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bookings(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

