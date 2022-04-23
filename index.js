const express = require('express');
const app = express();

app.use(express.static("./public"))

//require("./api/index.js")(__dirname);

app.listen(3000, () => {
  console.log('server started');
});
