import { Entity } from "../../../core/entity";
import { Optional } from "../../../core/utils/optional";
import { UniqueEntityID } from "../../../core/utils/unique-entity-id";

interface ORGProps {
  email: string;
  password: string;

  description?: string | null;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class ORG extends Entity<ORGProps> {
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get description() {
    return this.props.description;
  }
  get name() {
    return this.props.name;
  }
  get phone() {
    return this.props.phone;
  }
  get address() {
    return this.props.address;
  }
  get city() {
    return this.props.city;
  }
  get state() {
    return this.props.state;
  }
  get zip() {
    return this.props.zip;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<ORGProps, "createdAt">, id?: UniqueEntityID) {
    const org = new ORG(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return org;
  }
}
