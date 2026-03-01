
export interface CreatePetCommand {
    name: string
    orgId: string
    state: string
    city: string,
    description: string,
    size: string
    dependence: string
    energy: string
}

export interface CreatePetResponse {
    pet: {
        id: string
    }
}