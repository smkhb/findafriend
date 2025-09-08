import { PrismaPetsRepo } from "../../repos/prisma-pets-repo";
import { GetPetUseCase } from "../get-pets";

export function makeGetPet() {
  const petsRepo = new PrismaPetsRepo();
  const getPetUseCase = new GetPetUseCase(petsRepo);

  return getPetUseCase;
}
