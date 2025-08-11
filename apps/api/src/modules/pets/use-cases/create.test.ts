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

let petsRepo: InMemoryPetsRepo;
let orgsRepo: InMemoryOrgsRepo;
let useCase: CreatePetUseCase;
let orgUseCase: CreateORGUseCase;

describe("create pet use case", () => {
  beforeEach(() => {
    petsRepo = new InMemoryPetsRepo();
    orgsRepo = new InMemoryOrgsRepo();
    useCase = new CreatePetUseCase(petsRepo, orgsRepo);
    orgUseCase = new CreateORGUseCase(orgsRepo);
  });

  it("should be able to create a new pet", async () => {
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

    const { pet } = await useCase.execute({
      name: "Test pet",
      orgId: org.id.toString(),
      description: "A friendly test pet",
      age: Age.PUPPY,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.VERY_DEPENDENT,
      size: Size.SMALL,
      environmentSize: EnvironmentSize.LARGE,
    });

    expect(pet.name).toEqual(petsRepo.items[0].name);
  });

  it("should not allow creating a pet without a valid orgID", async () => {
    await expect(
      useCase.execute({
        name: "Test pet",
        orgId: "invalid-org-id",
        description: "A friendly test pet",
        age: Age.PUPPY,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.VERY_DEPENDENT,
        size: Size.SMALL,
        environmentSize: EnvironmentSize.LARGE,
      })
    ).rejects.toThrow("Organization does not exist");
  });
});
