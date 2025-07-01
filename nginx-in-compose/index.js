// IMPORTS
const dotenv = require("dotenv");
const express = require("express");

// ENV CONFIG
const nodeEnv = process.env.NODE_ENV || "development";
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });
console.log("Loaded " + envFile + ":");
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

const current_env = nodeEnv === "development" ? "dev" : "prod";
console.log("current_env", current_env);

// ROUTES
app.get("/", (req, res) => {
  console.log("BASE URL", req.url);

  res.send(`
    <h2>ALIVE and Serving in NGINX! 🙋🙋🙋 jordan100-server is in ${nodeEnv} ENV 🛩️🛩️🛩️</h2>
    <ul>
      <li><a href="/api/v1/users">Users</a></li>
      <li><a href="/api/v1/products">Products</a></li>
    </ul>
  `);
});

app.use("/api/v1/users", (req, res) => {
  res.status(200).json({
    msg: "LIST OF USERS",
    users: ["Alice", "Bob", "Charlie", "Diana", "Ethan"],
  });
});

app.use("/api/v1/products", (req, res) => {
  res.status(200).json({
    msg: "LIST OF PRODUCTS",
    products: ["Laptop", "Phone", "Tablet", "Monitor", "Headphones"],
  });
});

// BOTTOM MIDDLEWARES
app.use((req, res, next) => {
  res
    .status(404)
    .send("<h3>Route Does not Exist</h3>" + "<a href='/'>Go Back</a>");
});
app.use((err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong",
  };

  res.status(customError.statusCode).json({
    ERROR: customError.msg,
  });
});

// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log("Server started at " + port + " and connected to DB !!");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
console.log("... on " + process.env.NODE_ENV + " environment 🚀");
