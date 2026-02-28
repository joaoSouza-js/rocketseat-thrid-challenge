import { Org } from "../../../domain/org/entities/org"
import { OrgRepository } from "../../../domain/org/repositories/org-repository"

export class orgInMemoryDb implements OrgRepository {
    private orgs: Org[] = []
    findByEmail(email: string): Promise<Org | null> {
        const org = this.orgs.find(org => org.email.toString() === email)   ?? null
        return Promise.resolve(org)
    }
    findById(id: string): Promise<Org | null> {
        const org = this.orgs.find(org => org.id === id)   ?? null
        return Promise.resolve(org)
    }
    save(input: Org): Promise<void> {
        this.orgs.push(input)
        return Promise.resolve()
    }
}