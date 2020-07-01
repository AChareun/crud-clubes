const file = require('../../helpers/RW-helpers');

const clubPageRoutes = (app, fs) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';

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
        const newData = data.filter((club) => club.tla !== req.params.tla);

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          fs.unlink(`${teamPath + req.params.tla}.json`, (err) => {
            if (err) throw err;

            res.status(200).redirect('/club-list');
          });
        });
      }, true);
    });
};

module.exports = clubPageRoutes;
