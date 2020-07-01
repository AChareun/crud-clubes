const file = require('../../helpers/RW-helpers');
const updateClub = require('../../helpers/update-helper');

const updateClubRoutes = (app, fs) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';

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
    .put('/club-update/:tla', (req, res, next) => {
      file.readFile(fs, dataPath, (data) => {
        const newData = updateClub(data, req.body);

        // Still needs to update the standalone club file

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          next();
        });
      }, true);
    })
    .put('/club-update/:tla', (req, res) => {
      file.readFile(fs, `${teamPath + req.params.tla}.json`, (data) => {
        const newData = updateClub(data, req.body, true);

        file.writeFile(fs, `${teamPath + req.params.tla}.json`, JSON.stringify(newData, null, 2), () => {
          res.status(200).redirect(`/club/${req.body.tla}`);
        });
      }, true);
    });
};

module.exports = updateClubRoutes;
