// Dependencies

var express = require("express");
var path = require("path");

// Sets up the Express App

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Star Wars client (DATA)

var client = [

  // Resturant (DATA)
  {
    name: "Table1",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "14516"
  },
  {
    name: "Table2",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "14516"
  },
  {
    name: "Table3",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "14516"
  },
  {
    name: "Table4",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "24516"
  },
  {
    name: "Table5",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "24516"
  },
  {
    name: "Table6",
    phone: "(224)334-2567",
    email: "ron@pat.co",
    id: "44516"
  },
];

// Routes

// 

// Basic route that sends the user first to the AJAX Page
// -----------------------------------needs attention ---------------------------------------------------------
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all client
app.get("/api/client", function(req, res) {
  return res.json(client);
});

// -----------------------------------needs attention -----------------------------------------------------------
// Displays a single character, or returns false
app.get("/api/client/:table", function (req, res) {

  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < client.length; i++) {
    if (chosen === client[i].routeName) {
      return res.json(client[i]);
    }
  }

  return res.json(false);
});

// Create New client - takes in JSON input
app.post("/api/reservation", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newClient = req.body;

  // Using a RegEx Pattern to remove spaces from newClient
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newClient.routeName = newClient.name.replace(/\s+/g, "").toLowerCase();

  console.log(newClient);

  client.push(newClient);

  res.json(newClient);
});

// Starts the server to begin listening

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});