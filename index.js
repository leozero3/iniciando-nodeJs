const api = require("./api");

const localStorage = require("localStorage");

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

// enviar e buscar dados

var products = [];
server.post("/products", (req, res) => {
  const { id, name, price } = req.body;

  products.push({ id: id, name: name, price: price });
  res.send({ message: "Sucesso" });

  // post  --  http://localhost:3000/products
});

server.get("/products", (req, res) => {
  res.send({ products: products });
  // GET --  http://localhost:3000/products
});

//PUT
server.put("/products", (req, res) => {
  const { name, price } = req.body;
  const { oldName } = req.query;
  const index = products.findIndex((item) => item.name == oldName);
  products[index].name = name;
  products[index].price = price;
  res.send({ message: "Sucesso" });
  // PUT --  http://localhost:3000/products
});

//
// DELETE
server.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const newProducts = products.filter((item) => item.id !== parseInt(id));

  products = newProducts;
  res.send({ product: products });
});

// pokemon
server.get("/pokemon", async (req, res) => {
  try {
    const { status, data } = await api.get("pokemo/1");

    return res.send({ name: data.name });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

function verifyUserAlread(req, res, next) {
  const { email } = req.body;
  if (!allUsers.find((user) => user.email === email)) {
    return next();
  }

  return res.status(400).json({ Failed: "Email nao registrado" });
}

const allUsers = [];

server.post("/register-users", verifyUserAlread, (req, res) => {
  const user = req.body;
  allUsers.push(user);
  localStorage.setItem("users", JSON.stringify(allUsers));
  return res.json({ user });
});

server.get("/users", (req, res) => {
  const user = JSON.parse(localStorage.getItem("users"));

  return res.json(user);
});
