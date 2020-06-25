const clubPageRoutes = (app, fs) => {
  app.get('/club/:id', (req, res) => {
    const dataPath = `./public/data/equipos/${req.params.id}.json`;
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.render('club', {
        data: {
          club: JSON.parse(data),
        },
        style: 'club.css',
      });
    });
  });
};

module.exports = clubPageRoutes;
