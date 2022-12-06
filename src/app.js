const yargs = require("yargs");

const { client, connect } = require("./db/connection");
const Movie = require("./utils/index");

const app = async (yargsinput) => {
  const movieCollection = await connect();
  if (yargsinput.create) {
    console.log("Entering Create");
    const newMovie = new Movie(yargsinput.title, yargsinput.actor);
    await newMovie.create(movieCollection);
    // code to add movie put here
  } else if (yargsinput.read) {
    console.log("Entering Read");
  } else if (yargsinput.update) {
    console.log("Entering Update");
  } else if (yargsinput.delete) {
    console.log("Entering Delete");
  } else {
    console.log("Command not recognised");
  }

  await client.close();
};

app(yargs.argv);
