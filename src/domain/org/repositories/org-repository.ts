import { Org } from "../entities/org"

export interface OrgRepository {
    save(input: Org): Promise<void>
    findById(id: string): Promise<Org | null>
    findByEmail(email: string): Promise<Org | null>
}

