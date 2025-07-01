import { ORGSRepo } from "./orgs-repo";
import { Org as PrismaORG } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ORG as DomainORG } from "../entities/org";
import { PrismaORGMapper } from "../mapper/prisma-org-mapper";

export class PrismaOrgsRepo implements ORGSRepo {
  async findByEmail(email: string): Promise<DomainORG | null> {
    const org = await prisma.org.findUnique({
      where: {
        email: email,
      },
    });
    if (!org) {
      return null;
    }

    return PrismaORGMapper.toDomain(org);
  }
  async createORG(raw: DomainORG): Promise<void> {
    const data = PrismaORGMapper.toPrisma(raw);

    await prisma.org.create({
      data,
    });
  }
}
