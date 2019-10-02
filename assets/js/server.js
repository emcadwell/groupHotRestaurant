// Dependencies

var express = require("express");
var path = require("path");

// Sets up the Express App

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars client (DATA)

var client = [
  
// Resturant (DATA)
  {
    routeName: "Table1",
    name: "Table 1",
    seatingType: "Bar",
    seatingAmount: "1"
  },
  {
    routeName: "Table2",
    name: "Table 2",
    seatingType: "Bar",
    seatingAmount: "1"
  },
  {
    routeName: "Table3",
    name: "Table 3",
    seatingType: "Bar",
    seatingAmount: "1"
  },
  {
    routeName: "Table4",
    name: "Table 4",
    seatingType: "Table",
    seatingAmount: "2"
  },
  {
    routeName: "Table5",
    name: "Table 5",
    seatingType: "Table",
    seatingAmount: "2"
  },
  {
    routeName: "Table6",
    name: "Table 6",
    seatingType: "Table",
    seatingAmount: "4"
  },
];

// Routes
// 

// Basic route that sends the user first to the AJAX Page
// -----------------------------------needs attention ---------------------------------------------------------
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "view.html"));
// });

// app.get("/add", function(req, res) {
//   res.sendFile(path.join(__dirname, "add.html"));
// });

// // Displays all client
// app.get("/api/client", function(req, res) {
//   return res.json(client);
// });
// -----------------------------------needs attention -----------------------------------------------------------
// Displays a single character, or returns false
app.get("/api/client/:character", function(req, res) {

  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < client.length; i++) {
    if (chosen === client[i].routeName) {
      return res.json(client[i]);
    }
  }

  return res.json(false);
});

// Create New client - takes in JSON input
app.post("/api/client", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newClient = req.body;

  // Using a RegEx Pattern to remove spaces from newClient
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newClient.routeName = newClient.name.replace(/\s+/g, "").toLowerCase();

  console.log(newClient);

  client.push(newClient);

  res.json(newClient);
}

// Starts the server to begin listening

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
