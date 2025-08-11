import { ORG as DomainORG } from "../entities/org";

export abstract class ORGSRepo {
  abstract createORG(data: DomainORG): Promise<void>;
  abstract findByEmail(email: string): Promise<DomainORG | null>;
  abstract findByID(ID: string): Promise<boolean>;
}