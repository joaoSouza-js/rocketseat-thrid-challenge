import { Email } from "../../value-object/email";

interface OrgProps {
  id: string;
  name: string;
  email: Email;
  phone: string;
  passwordHash: string;
  description: string;
  createdAt: Date;
}

interface CrateOrgProps {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  description: string;
}

export class Org {
  private constructor(private props: OrgProps) {}

  static create(input: CrateOrgProps): Org {
    return new Org({
      ...input,
      email: Email.fromString(input.email),
      createdAt: new Date(),
    });
  }

  static rehydrate(input: OrgProps): Org {
    return new Org(input);
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get phone() {
    return this.props.phone;
  }
  get description() {
    return this.props.description;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get passwordHash() {
    return this.props.passwordHash;
  }
}
