// importing dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

// initializing sequelize with sequelizeStore
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// setting up express app
const app = express();
const PORT = process.env.PORT || 3001;

// custom helpers functions to use with handlebars
const hbs = exphbs.create({ helpers });

// setting up session and connecting to sequelize db
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUnitialized: true,
  // session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// storing express-session as Express middleware
app.use(session(sess));

// setting handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// starting server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
