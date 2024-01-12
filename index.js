const express = require("express");
const mongoos = require("mongoose");
const app = express();
const Article = require("./models/Article");

app.use(express.json());

let PORT = 3000;

app.listen(PORT, async () => {
  console.log(`I am listening on port : ${PORT}`);
  await mongoos
    .connect(
      "mongodb+srv://chaiaberabah:cs01mtp02bf03@cluster0.axtfl1a.mongodb.net/car?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected successfully"))
    .catch((error) =>
      console.log("Error when tray to connecting to DB =>", error)
    );
});

app.get("/", async (req, res) => {
  res.status(200).send("Mrhba-bicom !");
});

app.get("/findsum/:num1/:num2", (req, res) => {
  /* let num1 = req.params.num1;
  let num2 = req.params.num2; */
  let { num1, num2 } = req.params;
  let result = Number(num1) + Number(num2);

  res.send(`the total is ${result}`);
});

app.post("/findsum2", (req, res) => {
  let { num1, num2 } = req.body;

  let result = Number(num1) * Number(num2);

  res.send(`the total is ${result}`);
});
app.post("/addcomments", (req, res) => {
  res.status(201).send("created");
});

app.get("/pam", (req, res) => {
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "arabic",
  });
});

app.get("/index", (req, res) => {
  //res.sendFile(__dirname + "/views/numbers.html");
  let boocle = "";
  for (let i = 0; i <= 100; i++) {
    boocle += i + " - ";
  }
  res.render("numbers.ejs", { name: boocle, sayhi: "berabah" });
});

app.post("/article", async (req, res) => {
  const newArticle = new Article();
  const title = req.body.title;
  const Body = req.body.Body;
  const numberOfLikes = req.body.numberOfLikes;

  newArticle.title = title;
  newArticle.body = Body;
  newArticle.numberOfLikes = numberOfLikes;
  await newArticle
    .save()
    .then(() => console.log(`[ ${newArticle.title} ]:=> created successfully`))
    .catch((error) => console.log("Error when tray to save to DB", error));
  res.status(201).json(newArticle);
});

app.get("/article", async (req, res) => {
  const articles = await Article.find();
  console.log(articles.length);

  res.status(200).json(articles);
});

app.get("/showarticle", async (req, res) => {
  const articles = await Article.find();

  res.render("articls.ejs", { allarticles: articles });
});

app.get("/article/:id", async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);

  res.status(200).json(article);
});

app.get("/article", async (req, res) => {
  const article = await Article.find();

  res.json(article);
});

app.delete("/article/:id", async (req, res) => {
  const { id } = req.params;

  const article = await Article.findByIdAndDelete(id);

  res.json("was deleted ok");
});

app.put("/article/:id", async (req, res) => {
  const id = req.params;
  const newArticle = new Article.findByIdAndUpdate(id);
  const articltitle = req.body.articltitle;
  const articlBody = req.body.articlBody;
  const numberOfLikes = req.body.numberOfLikes;

  newArticle.title = articltitle;
  newArticle.body = articlBody;
  newArticle.numberOfLikes = numberOfLikes;
  newArticle
    .save()
    .then(() => console.log(`[ ${newArticle.title} ]:=> updated successfully`))
    .catch((error) => console.log("Error when tray to update to DB", error));
  await res.status(201).json(newArticle);
});
