const file = require('../../helpers/RW-helpers');
const clubHelper = require('../../helpers/club-mod');

const addClubRoutes = (app, fs, upload) => {
  const dataPath = './data/equipos.json';
  const teamPath = './data/equipos/';

  app.get('/add-club', (req, res) => {
    res.render('add-club', {
      style: 'add-club.css',
    });
  })
    .post('/add-club', upload.single('crestUrl'), (req, res) => {
      file.readFile(fs, dataPath, (data) => {
        const [newData, newClub] = clubHelper.createClub(req.body, req.file, data);

        file.writeFile(fs, dataPath, JSON.stringify(newData, null, 2), () => {
          file.writeFile(fs, (`${teamPath + req.body.tla}.json`), JSON.stringify(newClub, null, 2), () => {
            res.status(200).redirect(`/club/${newClub.id}`);
          });
        });
      }, true);
    });
};

module.exports = addClubRoutes;
