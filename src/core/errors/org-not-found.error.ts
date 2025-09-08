export class ORGNotFoundError extends Error {
  constructor() {
    super("Organization not found");
  }
}
