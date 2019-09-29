const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// Require variables from .env file if available
require('dotenv').config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DEV = process.env.NODE_ENV === 'development';

const app = express();

// Create `ExpressHandlebars` instance with a default layout.
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: ['views/partials']
});

// Set template engine.
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Set static dir for public files.
app.use(express.static(path.join(__dirname, 'public')));

// Set all routes to render pizza.
app.get('*', (req, res) => {
  const { details, sections } = require('./data.json');
  res.render('pizza', {
    details,
    center: sections[0],
    sections
  });
});

app.listen(PORT, () => {
  if (DEV) {
    console.log(`Server running at http://${HOST}:${PORT}`);
  }
});
