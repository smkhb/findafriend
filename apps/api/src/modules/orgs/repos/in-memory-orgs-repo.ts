import { ORGSRepo } from "./orgs-repo";
import { ORG as DomainORG } from "../entities/org";

export class InMemoryOrgsRepo implements ORGSRepo {
  public items: DomainORG[] = [];

  async findByEmail(email: string): Promise<DomainORG | null> {
    const org = this.items.find((org) => org.email === email);

    if (!org) {
      return null;
    }
    return org;
  }

  async createORG(org: DomainORG): Promise<void> {
    this.items.push(org);
  }

  async findByID(ID: string): Promise<boolean> {
    const org = this.items.find((org) => org.id.toString() === ID);
    return !!org;
  }

  async findByCity(city: string): Promise<DomainORG[]> {
    const orgs = this.items.filter((org) => org.city === city);

    return orgs;
  }
}
