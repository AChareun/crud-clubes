class Club {
  constructor(args) {
    this.area = {
      id: 2072,
      name: 'England',
    };
    this.id = parseFloat(args.id);
    this.name = args.name;
    this.shortName = args.shortName;
    this.tla = args.tla;
    this.crestUrl = args.crestUrl;
    this.address = args.address;
    this.phone = args.phone;
    this.website = args.website;
    this.email = args.email;
    this.founded = args.founded;
    this.clubColors = args.clubColors;
    this.venue = args.venue;
    this.lastUpdated = new Date();
  }
}

module.exports = Club;
