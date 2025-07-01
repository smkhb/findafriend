import { PrismaOrgsRepo } from "../../repos/prisma-orgs-repo";
import { AuthenticateORGUseCase } from "../authenticate";

export function makeAuthenticateORG() {
  const orgsRepo = new PrismaOrgsRepo();
  const authenticateORGUseCase = new AuthenticateORGUseCase(orgsRepo);

  return authenticateORGUseCase;
}
