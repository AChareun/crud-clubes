const clubListRoutes = (app, fs) => {
  const dataPath = './public/data/equipos.json';

  app.get('/club-list', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.render('club-list', {
        data: {
          clubs: JSON.parse(data),
        },
        style: 'club-list.css',
      });
    });
  });
};

module.exports = clubListRoutes;
