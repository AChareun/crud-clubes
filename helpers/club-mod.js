const Club = require('../entities/club');

const placeholderCrest = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.psg.fr%2Fimg%2Fplaceholders%2Fcrest-placeholder.png&f=1&nofb=1';

const createClub = (reqBody, reqFile, clubsData) => {
  const reqData = reqBody;

  reqData.crestUrl = reqFile ? `/uploads/crests/${reqFile.filename}` : placeholderCrest;
  reqData.id = Number(clubsData[(clubsData.length - 1)].id + 1);

  const newClub = new Club({ ...reqData });
  const updatedClubsData = clubsData;

  updatedClubsData.push(newClub);

  return [updatedClubsData, newClub];
};

const updateClub = (reqBody, reqFile, oldData, standalone = false) => {
  const reqData = reqBody;
  reqData.crestUrl = reqFile ? `/uploads/crests/${reqFile.filename}` : placeholderCrest;
  const newData = oldData;

  const newClubData = new Club(reqData);

  if (!standalone) {
    const clubToUpdate = newData.findIndex((club) => club.id === newClubData.id);
    Object.entries(newClubData).forEach(([key, value]) => {
      newData[clubToUpdate][key] = value === undefined ? newData[clubToUpdate][key] : value;
    });
  } else {
    Object.entries(newClubData).forEach(([key, value]) => {
      newData[key] = value === undefined ? newData[key] : value;
    });
  }

  return newData;
};

module.exports = { createClub, updateClub };
