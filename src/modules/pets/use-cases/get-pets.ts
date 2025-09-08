import { Pet } from "../entities/pet";
import { PetsRepo } from "../repos/pets-repo";


interface GetPetUseCaseRequest {
  petID: string;
}

interface GetPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petsRepo: PetsRepo) {}

  async execute({
    petID,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepo.findByID(petID);

    if (!pet) {
      throw new Error("Pet not found");
    }

    return { pet };
  }
}
