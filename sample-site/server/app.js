const express = require("express");

module.exports = app = express();

app.get("/", (req, res) => {
  const serverId = process.env.SERVER_ID || "unknown";
  res.json({
    status: "Ok",
    message: "Server Alive 🔥",
    req: `Requested received on container listening on at ${serverId}`,
  });
});
