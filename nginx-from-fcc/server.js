require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));

  const servedFrom = req.headers["x-served-from"] || "docker";
  // Get client IP
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Get User-Agent
  const userAgent = req.headers["user-agent"];

  console.log("SERVED_FROM", servedFrom);
  res.json({
    status: "Server Alive",
    servedFrom,
    clientIp,
    userAgent,
  });
});

app.listen(port, () => {
  console.log(`Server:${port} running 🚀`);
});
