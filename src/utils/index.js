// create an object called Movie
class Movie {
  constructor(title, actor = "Not Specified") {
    this.title = title;
    this.actor = actor;
  }

  // add a movie in the database
  async create(movieCollection) {
    console.log("Entering create within index.js");
    await movieCollection.insertOne(this);
  }
  // async read(movieCollection) {
  //   console.log("Entering create within index.js");
  //   await movieCollection.insertOne(this);
  // }
  // async update(movieCollection) {
  //   console.log("Entering create within index.js");
  //   await movieCollection.insertOne(this);
  // }
  // async delete(movieCollection) {
  //   console.log("Entering create within index.js");
  //   await movieCollection.insertOne(this);
  // }
}

module.exports = Movie;
