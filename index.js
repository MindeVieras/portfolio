const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const hostname = 'localhost';
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
