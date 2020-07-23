const express = require('express');

const router = express.Router();

const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/crests/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

const clubListRoutes = require('./club-list');
const clubPageRoutes = require('./club-page');
const addClubRoutes = require('./add-club');
const updateClubRoutes = require('./update-club');

router.get('/', (req, res) => {
  res.render('home', {
    style: 'home.css',
  });
});

clubPageRoutes(router, fs);

clubListRoutes(router, fs);

addClubRoutes(router, fs, upload);

updateClubRoutes(router, fs, upload);

module.exports = router;
