import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryPetsRepo } from "../repos/in-memory-pets-repo";
import { InMemoryOrgsRepo } from "../../orgs/repos/in-memory-orgs-repo";
import { CreatePetUseCase } from "./create";

import { IndependenceLevel } from "../entities/enums/indepence-level";
import { EnvironmentSize } from "../entities/enums/environment-size";
import { EnergyLevel } from "../entities/enums/energy-level";
import { Size } from "../entities/enums/size";
import { Age } from "../entities/enums/age";
import { CreateORGUseCase } from "../../orgs/use-cases/create";
import { GetPetUseCase } from "./get-pets";

let petsRepo: InMemoryPetsRepo;
let orgsRepo: InMemoryOrgsRepo;
let createPetUseCase: CreatePetUseCase;
let orgUseCase: CreateORGUseCase;

let useCase: GetPetUseCase;

describe("create pet use case", () => {
  beforeEach(() => {
    petsRepo = new InMemoryPetsRepo();
    orgsRepo = new InMemoryOrgsRepo();
    createPetUseCase = new CreatePetUseCase(petsRepo, orgsRepo);
    orgUseCase = new CreateORGUseCase(orgsRepo);

    useCase = new GetPetUseCase(petsRepo);
  });

  it("should be able to get an existing pet", async () => {
    const { org } = await orgUseCase.execute({
      name: "Test Org",
      email: "test@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    const { pet } = await createPetUseCase.execute({
      name: "Test pet",
      orgID: org.id.toString(),
      description: "A friendly test pet",
      age: Age.PUPPY,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.VERY_DEPENDENT,
      size: Size.SMALL,
      environmentSize: EnvironmentSize.LARGE,
    });

    const { pet: fetchedPet } = await useCase.execute({
      petID: pet.id.toString(),
    });

    expect(fetchedPet.name).toEqual(pet.name);
  });

});
