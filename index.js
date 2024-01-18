const express = require("express");

const server = express();

server.use(express.json());

server.listen(3000);

server.get("/first", (req, res) => {
  return res.send({ first: "hello" });
});
