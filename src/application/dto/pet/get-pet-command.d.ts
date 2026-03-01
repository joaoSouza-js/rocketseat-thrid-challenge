import { PetResponseDTO } from "@/application/mappers/pet-response-mapper";

interface GetPetCommand {
    id: string;
}

interface GetPetCommandResponse {
    pet: PetResponseDTO
}