const file = require('../public/js/RW-helpers');

const addClubRoutes = (app, fs) => {
  const dataPath = './public/data/equipos.json';

  app.get('/add-club', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.render('add-club', {
        data: {
          clubs: JSON.parse(data),
        },
        style: 'add-club.css',
      });
    });
  })
    .post('/add-club', (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const newClubId = Object.keys(data).length + 1;

        data[newClubId] = JSON.parse(req.body.data);

        file.writeFile(fs, dataPath, JSON.stringify(data, null, 2), () => {
          res.status(200).send('new club added');
        });
      }, true);
    });
};

module.exports = addClubRoutes;
