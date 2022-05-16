// init project
import * as axios from 'axios';
import express  from 'express';
import bodyParser  from 'body-parser';
import {addRecord} from './google-sheet-service.js';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/notion-search-response", function (req, res) {
  return res.send(getPath(req.body));
});

app.post("/super-search", async (req, res) => {
  const query = req.body.query;
  if(!query || !query.includes("SiteSearch")){
    return res.end();
  }
  var requestText = req.body.variables.input.query;
  await addRecord(requestText);
  return res.send();
});

// This route processes GET requests to "/"`
app.get("/", function (req, res) {
  res.send(
    '<h1>REST API</h1><p>A REST API starter using Express and body-parser.<br /><br />To test, curl the following and view the terminal logs:<br /><br /><i>curl -H "Content-Type: application/json" -X POST -d \'{"username":"test","data":"1234"}\' https://' +
      ".sse.codesandbox.io/update<i></p>"
  );
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
