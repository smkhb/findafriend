export class CityNotProviedError extends Error {
  constructor() {
    super("City not provided");
  }
}
