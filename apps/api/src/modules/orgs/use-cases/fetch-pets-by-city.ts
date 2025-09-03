import { Age } from "../../pets/entities/enums/age";
import { EnergyLevel } from "../../pets/entities/enums/energy-level";
import { EnvironmentSize } from "../../pets/entities/enums/environment-size";
import { IndependenceLevel } from "../../pets/entities/enums/indepence-level";
import { Size } from "../../pets/entities/enums/size";
import { Pet as PetDomain } from "../../pets/entities/pet";
import { PetsRepo } from "../../pets/repos/pets-repo";
import { ORGSRepo } from "../repos/orgs-repo";

interface FetchPetsByCityUseCaseRequest {
  city: string;
  page: number;

  order?: "asc" | "desc";

  filters?: {
    age?: Age;
    size?: Size;
    energyLevel?: EnergyLevel;
    independenceLevel?: IndependenceLevel;
    environmentSize?: EnvironmentSize;
  };
}

interface FetchPetsByCityUseCaseResponse {
  pets: PetDomain[];
}
export class FetchPetsByCityUseCase {
  constructor(private orgsRepo: ORGSRepo, private petsRepo: PetsRepo) {}

  async execute({
    city,
    page = 1,
    order = "desc",
    filters = {},
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const orgs = await this.orgsRepo.findByCity(city);
    const orgsIDs = orgs.map((org) => org.id.toString());
    const pets = await this.petsRepo.searchMany(orgsIDs, page, order, filters);

    return {
      pets,
    };
  }
}
