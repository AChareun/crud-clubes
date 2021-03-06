const file = require('../../helpers/RW-helpers');

const clubHelper = require('../../helpers/club-mod');

const getTla = require('../../helpers/get-tla');

const updateClubRoutes = (app, fs, upload) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';
  const teamsBuffer = fs.readFileSync(dataPath);

  app.get('/club-update/:id', (req, res) => {
    const clubTla = getTla(req.params.id, teamsBuffer);
    fs.readFile(`${teamPath + clubTla}.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.render('update-club', {
        data: {
          club: JSON.parse(data),
        },
        style: 'update-club.css',
      });
    });
  })
    .put('/club-update/:id', upload.single('crestUrl'), (req, res, next) => {
      file.readFile(fs, dataPath, (data) => {
        const newData = clubHelper.updateClub(req.body, req.file, data);

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          next();
        });
      }, true);
    })
    .put('/club-update/:id', (req, res) => {
      const clubTla = getTla(req.params.id, teamsBuffer);
      file.readFile(fs, `${teamPath + clubTla}.json`, (data) => {
        const newData = clubHelper.updateClub(req.body, req.file, data, true);

        file.writeFile(fs, `${teamPath + clubTla}.json`, JSON.stringify(newData, null, 2), () => {
          res.status(200).redirect(`/club/${newData.id}`);
        });
      }, true);
    });
};

module.exports = updateClubRoutes;
