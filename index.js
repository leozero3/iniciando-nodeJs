const express = require("express");

const server = express();

server.use(express.json());

server.listen(3000);

server.get("/first", (req, res) => {
  return res.send({ first: "hello" });
  // http://localhost:3000/first
});

server.get("/query-params", (req, res) => {
  const name = req.query.name;
  return res.json({ result: `seja bem vindo ${name}` });
  // http://localhost:3000/query-params?name=leo
});

server.get("/query-params1", (req, res) => {
  const { name, age } = req.query;
  return res.json({ result: `seja bem vindo ${name} sua idade é ${age}` });
  // http://localhost:3000/query-params1?name=leo&age=28
});
