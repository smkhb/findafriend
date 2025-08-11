import { PrismaOrgsRepo } from "../../../orgs/repos/prisma-orgs-repo";
import { PrismaPetsRepo } from "../../repos/prisma-pets-repo";
import { CreatePetUseCase } from "../create";

export function makeCreatePet() {
  const petsRepo = new PrismaPetsRepo();
  const orgsRepo = new PrismaOrgsRepo();
  const createPetUseCase = new CreatePetUseCase(petsRepo, orgsRepo);

  return createPetUseCase;
}
