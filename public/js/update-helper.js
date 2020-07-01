// Take object => update props with req.body => return object

const updateClub = (oldData, reqData, standalone = false) => {
  const newData = oldData;

  Object.entries(reqData).forEach(([key, value]) => {
    if (!standalone) {
      const clubToUpdate = newData.findIndex((club) => club.tla === reqData.tla);
      newData[clubToUpdate][key] = value;
    } else {
      newData[key] = value;
    }
  });

  return newData;
};

module.exports = updateClub;
