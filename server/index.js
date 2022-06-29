const path = require('path');
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });