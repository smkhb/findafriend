import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepo } from "../repos/in-memory-orgs-repo";
import { CreateORGUseCase } from "./create";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";
import { InMemoryPetsRepo } from "../../pets/repos/in-memory-pets-repo";
import { CreatePetUseCase } from "../../pets/use-cases/create";
import { Age } from "../../pets/entities/enums/age";
import { EnergyLevel } from "../../pets/entities/enums/energy-level";
import { IndependenceLevel } from "../../pets/entities/enums/indepence-level";
import { Size } from "../../pets/entities/enums/size";
import { EnvironmentSize } from "../../pets/entities/enums/environment-size";

let orgsRepo: InMemoryOrgsRepo;
let createOrgUseCase: CreateORGUseCase;

let petsRepo: InMemoryPetsRepo;
let createPetUseCase: CreatePetUseCase;

let useCase: FetchPetsByCityUseCase;

describe("create org use case", () => {
  beforeEach(async () => {
    orgsRepo = new InMemoryOrgsRepo();
    createOrgUseCase = new CreateORGUseCase(orgsRepo);

    petsRepo = new InMemoryPetsRepo();
    createPetUseCase = new CreatePetUseCase(petsRepo, orgsRepo);

    useCase = new FetchPetsByCityUseCase(orgsRepo, petsRepo);

    const org = await createOrgUseCase.execute({
      name: "Test Org",
      email: "test@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    await Promise.all([
      createPetUseCase.execute({
        name: "Test pet 1",
        orgID: org.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      ,
      createPetUseCase.execute({
        name: "Test pet 2",
        orgID: org.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      createPetUseCase.execute({
        name: "Test pet 3",
        orgID: org.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      createPetUseCase.execute({
        name: "Test pet 4",
        orgID: org.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
    ]);
  });

  it("should be able to fetch pets by city", async () => {
    const pets = await useCase.execute({ city: "Test City", page: 1 });
    console.log("Pets:", pets);
    
    expect(pets.pets.length).toEqual(4);
  });
});
