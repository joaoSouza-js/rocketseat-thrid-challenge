import { IdGenerator } from "@/application/ports/id-generator";
import { randomUUID } from "node:crypto";

export class NodeIdGenerator implements IdGenerator {
  next(): string {
    const id = randomUUID();
    return id;
  }
}
