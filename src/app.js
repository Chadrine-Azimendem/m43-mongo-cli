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
    // update actor
    const updateResult = await movieCollection.updateOne(
      {
        "title": yargsinput.title,
      },
      {
        $set: { actor: yargsinput.actor },
      }
    );
    if (updateResult.modifiedCount === 1) {
      console.log("actor updated successfully");
    } else {
      console.log("actor update unsuccessful");
    }
  } else if (yargsinput.updateTitle) {
    console.log("Entering Update title");
    // update title
    const updateResult = await movieCollection.updateOne(
      {
        "actor": yargsinput.actor,
      },
      {
        $set: { title: yargsinput.title },
      }
    );

    if (updateResult.modifiedCount === 1) {
      console.log("title updated successfully");
    } else {
      console.log("title update unsuccessful");
    }
  } else if (yargsinput.delete) {
    console.log("Entering Delete");
    // delete a movie with the input title from database
    const deleteResult = await movieCollection.deleteOne({
      "title": yargsinput.title,
    });

    if (deleteResult.deletedCount === 1) {
      console.log(" Deleted successfully");
    } else {
      console.log("Delete unsuccessful");
    }
  } else {
    console.log("Command not recognised");
  }

  // close data base connection
  await client.close();
};

app(yargs.argv);
