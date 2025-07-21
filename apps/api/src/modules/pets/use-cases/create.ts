import { UniqueEntityID } from "../../../core/utils/unique-entity-id";
import { Pet } from "../entities/pet";
import { PetsRepo } from "../repos/pets-repo";

import { Age } from "../entities/enums/age";
import { EnergyLevel } from "../entities/enums/energy-level";
import { EnvironmentSize } from "../entities/enums/environment-size";
import { IndependenceLevel } from "../entities/enums/indepence-level";
import { Size } from "../entities/enums/size";

interface CreatePetUseCaseRequest {
  name: string;
  orgId: string;
  description?: string;

  age: Age;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  size: Size;
  environmentSize: EnvironmentSize;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepo: PetsRepo) {}

  async execute({
    name,
    description,
    age,
    energyLevel,
    independenceLevel,
    size,
    environmentSize,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = Pet.create({
      name,
      description,
      age,
      energyLevel,
      independenceLevel,
      size,
      environmentSize,
      orgId: new UniqueEntityID(orgId),
    });

    await this.petsRepo.createPet(pet);

    return { pet };
  }
}
