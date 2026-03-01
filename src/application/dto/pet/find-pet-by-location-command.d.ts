import { PetResponseDTO } from "@/application/mappers/pet-response-mapper";

export interface FindPetByLocationCommand {
  
    state: string;
    city: string;

    query?: {
        page?: number;
        limit?: number;
        size?: string;
        energy?: string;
        dependence?: string;
    };
}

export interface FindPetByLocationResponse {
    pets: PetResponseDTO[];
    total: number;
}
