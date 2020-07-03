const Club = require('../entities/club');

const createClub = (reqData, oldData) => {
  const newClub = new Club({ ...reqData });
  const newData = oldData;

  newData.push(newClub);

  return [newData, newClub];
};

const updateClub = (reqData, oldData, standalone = false) => {
  const newData = oldData;
  const newClubData = new Club(reqData);

  Object.entries(newClubData).forEach(([key, value]) => {
    if (!standalone) {
      const clubToUpdate = newData.findIndex(
        (club) => club.tla === newClubData.tla,
      );
      newData[clubToUpdate][key] = value === undefined ? newData[clubToUpdate][key] : value;
    } else {
      newData[key] = value === undefined ? newData[key] : value;
    }
  });

  return newData;
};

module.exports = { createClub, updateClub };