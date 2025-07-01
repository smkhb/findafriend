export class ORGAlreadyExistsError extends Error {
  constructor() {
    super("Organization already exists");
  }
}
