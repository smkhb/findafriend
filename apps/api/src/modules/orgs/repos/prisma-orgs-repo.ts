import { ORGSRepo } from "./orgs-repo";
import { Org as PrismaORG } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ORG as DomainORG } from "../entities/org";

export class PrismaOrgsRepo implements ORGSRepo {
  async createORG(raw: DomainORG): Promise<PrismaORG> {
    const data = {
      id: raw.id.toString(),
      email: raw.email,
      password: raw.password,
      description: raw.description,
      name: raw.name,
      phone: raw.phone,
      address: raw.address,
      city: raw.city,
      state: raw.state,
      zip: raw.zip,
    }; // Convert DomainORG to PrismaORG format

    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
