class Movie {
  constructor(title, actor = "Not Specified") {
    this.title = title;
    this.actor = actor;
  }

  async create(movieCollection) {
    console.log("Entering create within index.js");
    await movieCollection.insertOne(this);

    // code to save the data base
  }
}

module.exports = Movie;
