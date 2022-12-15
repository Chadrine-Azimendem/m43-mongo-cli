require("dotenv").config(); //import dotenv
const { MongoClient } = require("mongodb"); //import MongoClient from mongodb

//create a client connection by creating a new instance of the MongoClient
const client = new MongoClient(process.env.MONGO_URI);

//use asynchronous function when connecting to database
async function connectFn() {
  // add try catch block to catch any error if applicable.
  try {
    await client.connect();
    const db = client.db("m43mongo"); //m43mongo is the name of the database
    return db.collection("Movie"); // Movie is the name of the table
  } catch (error) {
    console.log(error);
  }
}

// export client and connectFn
module.exports = { client, connectFn };
