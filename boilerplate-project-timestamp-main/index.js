// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Endpoint to handle timestamp and date string conversion
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  let date;

  // If no date string is provided, return the current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the provided date is a Unix timestamp or a valid date string
    if (!isNaN(dateString)) {
      // If it's a Unix timestamp, parse it as an integer
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try to parse it as a natural date string
      date = new Date(dateString);
    }
  }

  // If the date is invalid, return an error
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Otherwise, return the Unix and UTC timestamps
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
