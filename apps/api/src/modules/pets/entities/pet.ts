import { Entity } from "../../../core/entity";
import { Optional } from "../../../core/utils/optional";
import { UniqueEntityID } from "../../../core/utils/unique-entity-id";

import { Age } from "./enums/age";
import { EnergyLevel } from "./enums/energy-level";
import { EnvironmentSize } from "./enums/environment-size";
import { IndependenceLevel } from "./enums/indepence-level";
import { Size } from "./enums/size";

interface PetProps {
  name: string;
  orgID: UniqueEntityID;
  description?: string | null;

  age: Age;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  size: Size;
  environmentSize: EnvironmentSize;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Pet extends Entity<PetProps> {
  get name() {
    return this.props.name;
  }

  get orgId() {
    return this.props.orgID;
  }

  get description() {
    return this.props.description;
  }

  get age() {
    return this.props.age;
  }

  get energyLevel() {
    return this.props.energyLevel;
  }

  get independenceLevel() {
    return this.props.independenceLevel;
  }

  get size() {
    return this.props.size;
  }

  get environmentSize() {
    return this.props.environmentSize;
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

  static create(props: Optional<PetProps, "createdAt">, ID?: UniqueEntityID) {
    const pet = new Pet(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      ID
    );

    return pet;
  }
}
