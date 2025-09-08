import { PrismaPetsRepo } from "../../../pets/repos/prisma-pets-repo";
import { PrismaOrgsRepo } from "../../repos/prisma-orgs-repo";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city";

export function makeFetchPetsByCity() {
  const orgsRepo = new PrismaOrgsRepo();
  const petsRepo = new PrismaPetsRepo();
  const useCase = new FetchPetsByCityUseCase(orgsRepo, petsRepo);

  return useCase;
}
