import { PrismaOrgsRepo } from "../../repos/prisma-orgs-repo";
import { CreateORGUseCase } from "../create";

export function makeCreateORG() {
  const orgsRepo = new PrismaOrgsRepo();
  const createORGUseCase = new CreateORGUseCase(orgsRepo);

  return createORGUseCase;
}
