const file = require('../public/js/RW-helpers');

const clubPageRoutes = (app, fs) => {
  const dataPath = './public/data/equipos.json';
  const teamPath = './public/data/equipos/';

  // Refactor to use IDs instead of TLA

  app.get('/club/:tla', (req, res) => {
    fs.readFile(`${teamPath + req.params.tla}.json`, 'utf8', (err, data) => {
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
  })
    .delete('/club/:tla/delete', (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const newData = data;
        const clubToDelete = newData.find((team) => team.tla === req.params.tla);
        delete newData[newData.indexOf(clubToDelete)];

        // Delete leaves a null on the JSON. Get rid of it

        // Still needs to delete the standalone team file

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          res.status(200).redirect('/club-list');
        });
      }, true);
    });
};

module.exports = clubPageRoutes;
