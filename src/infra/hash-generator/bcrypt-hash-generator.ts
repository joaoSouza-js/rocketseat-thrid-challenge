import { HashGenerator } from '@/application/ports/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHashGenerator implements HashGenerator {
    async hash(value: string): Promise<string> {
        return hash(value, 10)
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return compare(value, hash)
    }
}