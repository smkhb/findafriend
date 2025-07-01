import { hash } from "bcryptjs";
import { ORGSRepo } from "../repos/orgs-repo";
import { ORG } from "../entities/org";

interface CreateORGUseCaseRequest {
  name: string;
  email: string;
  password: string;
  description?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export class CreateORGUseCase {
  constructor(private orgsRepo: ORGSRepo) {}

  async execute({
    name,
    email,
    password,
    description,
    phone,
    address,
    city,
    state,
    zip,
  }: CreateORGUseCaseRequest): Promise<unknown> {
    const existingUser = await this.orgsRepo.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hash(password, 8);

    const org = ORG.create({
      name,
      email,
      password: hashedPassword,
      description,
      phone,
      address,
      city,
      state,
      zip,
    });

    await this.orgsRepo.createORG(org);

    return org;
  }
}
