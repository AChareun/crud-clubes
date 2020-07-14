const getTla = (clubId, clubsData) => {
  const clubsDB = JSON.parse(clubsData);
  const clubToReturn = clubsDB.find((club) => club.id === parseFloat(clubId));

  return clubToReturn.tla;
};

module.exports = getTla;
