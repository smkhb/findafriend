import { ORG } from "../entities/org";

export abstract class ORGSRepo {
  abstract createORG(data: ORG): Promise<unknown>;
  abstract findByEmail(email: string): Promise<unknown | null>;
}
