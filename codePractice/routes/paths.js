const { Router } = require("express");

module.exports = (function () {
  "use strict";
  let route = require("express").Router();
  const axios = require("axios");
  route.get("/", (req, res) => {
    res.send("home");
  });
  route.get("/contact", (req, res) => {
    res.send("contact");
  });
  route.get("/pokemon/:name", (req, res) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
      .then(({ data: hi }) => {
        res.json(hi);
      });
  });

  route.get("/hello", (req, res) => {
    res.send("hello world!");
  });

  return route;
})();
