import dotenv from 'dotenv';

dotenv.config();

const connection = require('knex')({
    client:'mysql',
    version: 8,
    connection: {
    host : '127.0.0.1',
    user : process.env.REACT_APP_APP_USER,
    password : process.env.REACT_APP_APP_PASSWORD,   
    charset  : 'utf8'
  },  
});

export default connection;
