import { Org } from "@/domain/org/entities/org";

export interface OrgResponseDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    createdAt: Date;
}

export class OrgResponseMapper {
    static toDTO(org: Org): OrgResponseDto {
        return {
            id: org.id,
            name: org.name,
            phone: org.phone,
            createdAt: org.createdAt,
            description: org.description,
            email: org.email.toString(),
        }
    }
}