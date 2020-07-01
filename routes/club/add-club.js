const file = require('../../helpers/RW-helpers');

const addClubRoutes = (app, fs) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';

  app.get('/add-club', (req, res) => {
    res.render('add-club', {
      style: 'add-club.css',
    });
  })
    .post('/add-club', (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const newData = data;
        newData.push(req.body);

        // Send extra data with the header

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          file.writeFile(fs, (`${teamPath + req.body.tla}.json`), JSON.stringify(req.body, null, 2), () => {
            res.status(200).redirect(`/club/${req.body.tla}`);
          });
        });
      }, true);
    });
};

module.exports = addClubRoutes;
