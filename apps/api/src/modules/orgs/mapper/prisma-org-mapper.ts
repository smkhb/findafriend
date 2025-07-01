import { Org as PrismaORG } from "@prisma/client";
import { ORG as DomainORG } from "../entities/org";
import { UniqueEntityID } from "../../../core/utils/unique-entity-id";

export class PrismaORGMapper {
  static toDomain(raw: PrismaORG): DomainORG {
    return DomainORG.create(
      {
        email: raw.email,
        password: raw.password,
        description: raw.description ?? null,
        name: raw.name,
        phone: raw.phone,
        address: raw.address,
        city: raw.city,
        state: raw.state,
        zip: raw.zip,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? null,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(org: DomainORG): PrismaORG {
    return {
      id: org.id.toString(),
      email: org.email,
      password: org.password,
      description: org.description ?? null,
      name: org.name,
      phone: org.phone,
      address: org.address,
      city: org.city,
      state: org.state,
      zip: org.zip,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt ?? null,
    };
  }
}
