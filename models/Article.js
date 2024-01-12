const mongoos = require("mongoose");
const Scheme = mongoos.Schema;

const articlSchema = new Scheme({
  title: String,
  body: String,
  numberOfLikes: Number,
});

const Article = mongoos.model("Article", articlSchema);
module.exports = Article;
