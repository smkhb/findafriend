import { PrismaPetsRepo } from "../../repos/prisma-pets-repo";
import { CreatePetUseCase } from "../create";

export function makeCreatePet() {
  const petsRepo = new PrismaPetsRepo();
  const createPetUseCase = new CreatePetUseCase(petsRepo);

  return createPetUseCase;
}
