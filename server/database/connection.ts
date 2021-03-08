import dotenv from 'dotenv';

dotenv.config();

const connection = require('knex')({
    client:'mysql',
    version: 8,
    connection: {
    host : '127.0.0.1',
    user : process.env.APP_USER,
    password : process.env.APP_PASSWORD,
   //  database : process.env.APP_DATABASE,
    charset  : 'utf8'
  },  
});

export default connection;
