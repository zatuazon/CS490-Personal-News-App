const userRoute = require('./users');
const path = require('path');
const xss = require('xss');

const constructorMethod = (app) => {
    app.use('/index', userRoute);

    app.use('*', (req, res) => {
      res.redirect('/index');
    });
  };
  
  module.exports = constructorMethod;