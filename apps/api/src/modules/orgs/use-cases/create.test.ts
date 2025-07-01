import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepo } from "../repos/in-memory-orgs-repo";
import { CreateORGUseCase } from "./create";
import { ORGAlreadyExistsError } from "../../../core/errors/org-already-exists-error";
import { compare } from "bcryptjs";

let orgsRepo: InMemoryOrgsRepo;
let useCase: CreateORGUseCase;
describe("create org use case", () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepo();
    useCase = new CreateORGUseCase(orgsRepo);
  });

  it("should be able to create a new org", async () => {
    const { org } = await useCase.execute({
      name: "Test Org",
      email: "test@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    expect(org.name).toEqual(orgsRepo.items[0].name);
  });

  it("should not allow creating an org with an existing email", async () => {
    const email = "test@org.com";
    await useCase.execute({
      name: "Test Org",
      email,
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    await expect(() =>
      useCase.execute({
        name: "Another Org",
        email,
        password: "securepassword",
        phone: "1234567890",
        address: "123 Test St",
        city: "Test City",
        state: "Test State",
        zip: "12345",
      })
    ).rejects.toBeInstanceOf(ORGAlreadyExistsError);
  });

  it("should hash the password before saving", async () => {
    const { org } = await useCase.execute({
      name: "Test Org",
      email: "test@org.com",
      password: "securepassword",
      phone: "1234567890",
      address: "123 Test St",
      city: "Test City",
      state: "Test State",
      zip: "12345",
    });

    const isPasswordCorrectlyHashed = await compare(
      "securepassword",
      org.password
    );

    expect(org.password).not.toEqual("securepassword");
    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
