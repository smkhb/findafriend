import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateORGUseCase } from "./authenticate";
import { InMemoryOrgsRepo } from "../repos/in-memory-orgs-repo";
import { ORG } from "../entities/org";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../../../core/errors/invalid-credentials-error";

let orgsRepo: InMemoryOrgsRepo;
let useCase: AuthenticateORGUseCase;
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepo();
    useCase = new AuthenticateORGUseCase(orgsRepo);
  });

  it("should authenticate a user with valid credentials", async () => {
    const org = ORG.create({
      name: "Test Org",
      email: "test@org.com",
      password: await hash("securepassword", 8),
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    await orgsRepo.createORG(org);

    const authenticatedOrg = await useCase.execute({
      email: "test@org.com",
      password: "securepassword",
    });

    expect(authenticatedOrg.org.email).toEqual(org.email);
  });

  it("should not authenticate a user with invalid email", async () => {
    const org = ORG.create({
      name: "Test Org",
      email: "test@org.com",
      password: await hash("securepassword", 8),
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    orgsRepo.createORG(org);

    await expect(() =>
      useCase.execute({
        email: "wrong@org.com",
        password: "securepassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not authenticate a user with invalid password", async () => {
    const org = ORG.create({
      name: "Test Org",
      email: "test@org.com",
      password: await hash("securepassword", 8),
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    orgsRepo.createORG(org);

    await expect(() =>
      useCase.execute({
        email: "test@org.com",
        password: "wrongpassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
