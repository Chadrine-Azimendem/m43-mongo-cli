const yargs = require("yargs"); //import yargs

const { client, connectFn } = require("./db/connection");
const Movie = require("./utils/index");

const app = async (yargsinput) => {
  const movieCollection = await connectFn();

  if (yargsinput.create) {
    console.log("Entering Create");
    // add movie
    const newMovie = new Movie(yargsinput.title, yargsinput.actor);
    await newMovie.create(movieCollection);
  } else if (yargsinput.read) {
    console.log("Entering Read");
    // read all the movies in the table
    const results = await movieCollection.find({}).toArray();
    console.table(results);
  } else if (yargsinput.updateActor) {
    console.log("Entering Update");
    const updateResult = await movieCollection.updateOne(
      {
        "title": yargsinput.title,
      },
      {
        $set: { actor: yargsinput.actor },
      }
    );
    console.log("updating", updateResult);
  } else if (yargsinput.updateTitle) {
    console.log("Entering Update title");
    const updateResult = await movieCollection.updateOne(
      {
        "actor": yargsinput.actor,
      },
      {
        $set: { title: yargsinput.title },
      }
    );
    console.log("updating", updateResult);
  } else if (yargsinput.delete) {
    console.log("Entering Delete");
    // delete a movie with the input title from database
    const deleteResult = await movieCollection.deleteOne({
      "title": yargsinput.title,
    });
    console.dir(deleteResult.deletedCount);
  } else {
    console.log("Command not recognised");
  }

  // close data base
  await client.close();
};

app(yargs.argv);
