class Movie {
  constructor(title, actor = "Not Specified") {
    this.title = title;
    this.actor = actor;
  }

  async create(movieCollection) {
    console.log("Entering create within index.js");
    // code to save the data base
    await movieCollection.insertOne(this);
  }
}

module.exports = Movie;
