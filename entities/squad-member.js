class SquadMember {
  constructor(...args) {
    this.id = args.id;
    this.name = args.name;
    this.position = args.position;
    this.dateOfBirth = args.dateOfBirth;
    this.countryOfBirth = args.countryOfBirth;
    this.nationality = args.nationality;
    this.shirtNumber = args.shirtNumber;
    this.role = args.role;
  }
}

module.exports = SquadMember;
