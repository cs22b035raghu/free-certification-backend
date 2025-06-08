const express = require('express');
const bodyPareser=require('body-parser');

const app = express();
const port = 3000;

app.use(bodyPareser.urlencoded({extended:false}));

// Timestamp API
app.post('/submit', (req, res) => {
  let input = req.body.date;
  console.log(input);
  let date;

  if (!input) {
    date = new Date();
  } else if (!isNaN(input)) {
    date = new Date(parseInt(input));
  } else {
    date = new Date(input);
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
