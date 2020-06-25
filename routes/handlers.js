const express = require('express');

const router = express.Router();

const fs = require('fs');

const clubListRoutes = require('./club-list');

const clubPageRoutes = require('./club-page');

router.get('/', (req, res) => {
  res.render('home', {
    style: 'main.css',
  });
});

clubPageRoutes(router, fs);

clubListRoutes(router, fs);

module.exports = router;
