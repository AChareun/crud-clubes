const file = require('../public/js/RW-helpers');

const updateClubRoutes = (app, fs) => {
  const dataPath = './public/data/equipos.json';
  const teamPath = './public/data/equipos/';

  app.get('/club-update/:tla', (req, res) => {
    fs.readFile(`${teamPath + req.params.tla}.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      // View for this route is missing

      res.render('update-club', {
        data: {
          club: JSON.parse(data),
        },
        style: 'update-club',
      });
    });
  })
    .put('/club-update/:tla', (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const newData = data;
        const clubToUpdate = newData.find((team) => team.tla === req.params.tla);
        newData[newData.indexOf(clubToUpdate)] = req.body;

        // Refactor to update only the props on the req
        // Still needs to update the standalone club file

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          res.status(200).redirect(`/club/${req.body.tla}`);
        });
      }, true);
    });
};

module.exports = updateClubRoutes;
