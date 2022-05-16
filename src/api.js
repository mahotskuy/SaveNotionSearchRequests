// init project
const express = require('express');
const bodyParser  = require('body-parser');
const addRecord = require('../google-sheet-service').addRecord;
const serverless = require("serverless-http");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use('/.netlify/functions/api', router);  

router.post("/super-search", async (req, res) => {
  const query = req.body.query;
  if(!query || !query.includes("SiteSearch")){
    return res.end();
  }
  var requestText = req.body.variables.input.query;
  await addRecord(requestText);
  return res.send();
});

// This route processes GET requests to "/"`
router.get("/", function (req, res) {
  res.send(
    '<h1>REST API</h1><p>A REST API starter using Express and body-parser.<br /><br />To test, curl the following and view the terminal logs:<br /><br /><i>curl -H "Content-Type: application/json" -X POST -d \'{"username":"test","data":"1234"}\' https://' +
      ".sse.codesandbox.io/update<i></p>"
  );
});

module.exports = app;
module.exports.handler = serverless(app);
