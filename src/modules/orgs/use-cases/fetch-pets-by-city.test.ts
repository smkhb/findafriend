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

describe("fetch pets by city", () => {
  beforeEach(async () => {
    orgsRepo = new InMemoryOrgsRepo();
    createOrgUseCase = new CreateORGUseCase(orgsRepo);

    petsRepo = new InMemoryPetsRepo();
    createPetUseCase = new CreatePetUseCase(petsRepo, orgsRepo);

    useCase = new FetchPetsByCityUseCase(orgsRepo, petsRepo);
  });

  it("should be able to fetch pets", async () => {
    const { org } = await createOrgUseCase.execute({
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
        orgID: org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      createPetUseCase.execute({
        name: "Test pet 2",
        orgID: org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
    ]);

    const { pets } = await useCase.execute({ city: "Test City", page: 1 });

    expect(pets.length).toEqual(2);
  });

  it("should be able to fetch pets from different orgs at the same city", async () => {
    const firstOrg = await createOrgUseCase.execute({
      name: "Test First Org",
      email: "firsttest@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    const secondOrg = await createOrgUseCase.execute({
      name: "Test Second Org",
      email: "secondtest@org.com",
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
        orgID: firstOrg.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      createPetUseCase.execute({
        name: "Test pet 2",
        orgID: secondOrg.org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
    ]);

    const pets = await useCase.execute({ city: "Test City", page: 1 });

    expect(pets.pets.length).toEqual(2);
  });

  it("should be able to fetch filtered pet(s)", async () => {
    const { org } = await createOrgUseCase.execute({
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
        orgID: org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.LOW,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
      createPetUseCase.execute({
        name: "Test pet 2",
        orgID: org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      }),
    ]);

    const { pets } = await useCase.execute({
      city: "Test City",
      page: 1,
      filters: { energyLevel: EnergyLevel.HIGH },
    });

    expect(pets.length).toEqual(1);
    expect(pets[0].energyLevel).toEqual("HIGH");
  });

  it("should be able to fetch paginated pets search", async () => {
    const { org } = await createOrgUseCase.execute({
      name: "Test Org",
      email: "test@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    for (let i = 1; i <= 22; i++) {
      await createPetUseCase.execute({
        name: `Test pet ${i}`,
        orgID: org.id.toString(),
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      });
    }

    const { pets } = await useCase.execute({ city: "Test City", page: 2 });
    expect(pets.length).toEqual(2);
    expect(pets[0].name).toEqual("Test pet 21");
    expect(pets[1].name).toEqual("Test pet 22");
  });
});
