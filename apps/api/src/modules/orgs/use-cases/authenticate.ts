import { compare } from "bcryptjs";
import { ORGSRepo } from "../repos/orgs-repo";
import { ORG } from "../entities/org";
import { ORGNotFoundError } from "../../../core/errors/org-not-found.error";
import { InvalidCredentialsError } from "../../../core/errors/invalid-credentials-error";

interface AuthenticateORGUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateORGUseCaseResponse {
  org: ORG;
}

export class AuthenticateORGUseCase {
  constructor(private orgsRepo: ORGSRepo) {}

  async execute({
    email,
    password,
  }: AuthenticateORGUseCaseRequest): Promise<AuthenticateORGUseCaseResponse> {
    const org = await this.orgsRepo.findByEmail(email);

    if (!org) {
      throw new ORGNotFoundError();
    }

    const doesPasswordMatch = await compare(password, org.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
