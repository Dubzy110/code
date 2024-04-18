const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const route = require("./routes/paths");

app.use("/", route); //home
app.use("/contact", route); //contact

app.use("/hello", route);

// :]

app.listen(port, (req, res) => console.log(`listening on ${port}!`));
