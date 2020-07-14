const file = require('../../helpers/RW-helpers');

const getTla = require('../../helpers/get-tla');

const clubPageRoutes = (app, fs) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';
  const teamsBuffer = fs.readFileSync(dataPath);

  // Refactor to use IDs instead of TLA

  app.get('/club/:id', (req, res) => {
    const clubTla = getTla(req.params.id, teamsBuffer);

    fs.readFile(`${teamPath + clubTla}.json`, 'utf8', (err, data) => {
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
    .delete('/club/:id/delete', (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const clubToDelete = data.find((club) => club.id === parseFloat(req.params.id));
        const newData = data.filter((club) => club.id !== parseFloat(req.params.id));

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          fs.unlink(`${teamPath + clubToDelete.tla}.json`, (err) => {
            if (err) throw err;

            res.status(200).redirect('/club-list');
          });
        });
      }, true);
    });
};

module.exports = clubPageRoutes;
