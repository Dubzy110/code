import dotenv from "dotenv";
import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public/")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  console.time("postLogin");
  try {
    if (
      (req.body.userName || "").toLowerCase() === process.env.USER_NAME &&
      req.body.passWord === process.env.USER_PASSWORD
    ) {
      res.send("ok");
    } else {
      res.status(403).render("badLogin");
    }
  } catch (err) {
    console.log(err, "error");
    res.status(400).send("bad request");
  }
  console.timeEnd("postLogin");
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
