const yargs = require("yargs");

const { client, connect } = require("./db/connection");
const Movie = require("./utils/index");

const app = async (yargsinput) => {
  const movieCollection = await connect();

  if (yargsinput.create) {
    console.log("Entering Create");
    // code to add movie put here
    const newMovie = new Movie(yargsinput.title, yargsinput.actor);
    await newMovie.create(movieCollection);
  } else if (yargsinput.read) {
    console.log("Entering Read");
    const results = await movieCollection.find({}).toArray();
    // log the table to the console.
    console.table(results);
  } else if (yargsinput.update) {
    console.log("Entering Update");
    // code to update a field here
    const myQuery = { title: yargsinput.title, actor: yargsinput.actor };
    await movieCollection.updateOne(myQuery);
    console.log("Updating", myQuery);
  } else if (yargsinput.delete) {
    console.log("Entering Delete");
    // code to delete movie here
    const myQuery = { title: yargsinput.title };
    await movieCollection.deleteOne(myQuery);
    console.log("deleting", myQuery);
  } else {
    console.log("Command not recognised");
  }

  await client.close();
};

app(yargs.argv);
