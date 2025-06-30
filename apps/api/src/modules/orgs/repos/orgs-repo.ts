import { ORG } from "../entities/org";

export abstract class ORGSRepo {
  abstract createORG(data: ORG): Promise<unknown>;
}
