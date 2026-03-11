import { Pet } from "@/domain/pet/entities/pet";
import { PetAvailableQuery, PetRepository } from "@/domain/pet/repositories/pet-repository";
import { LocationValueObject } from "@/domain/pet/value-object/location";
import { PetDependenceValueObject } from "@/domain/pet/value-object/pet-dependence";
import { PetEnergyValueObject } from "@/domain/pet/value-object/pet-energy";
import { PetSizeValueObject } from "@/domain/pet/value-object/pet-size";
import { PetModel } from "@/generated/models";
import { prisma } from "./index";
import {
  petEnumMapperDomainToPrisma,
  petEnumMapperPrismaToDomain,
} from "./mappers/pet-enums-mapper";

export class PrismaPetRepository implements PetRepository {
  private formatPet(prismaPet: PetModel): Pet {
    const pet = Pet.rehydrate({
      id: prismaPet.id,
      name: prismaPet.name,
      orgId: prismaPet.orgId,
      createdAt: prismaPet.createdAt,
      location: LocationValueObject.create({
        state: prismaPet.state,
        city: prismaPet.city,
      }),
      size: PetSizeValueObject.create(
        petEnumMapperPrismaToDomain.petRepositoryPetSizeMapper[prismaPet.size],
      ),
      dependence: PetDependenceValueObject.create(
        petEnumMapperPrismaToDomain.petRepositoryPetDependenceMapper[prismaPet.dependence],
      ),
      energy: PetEnergyValueObject.create(
        petEnumMapperPrismaToDomain.petRepositoryPetEnergyMapper[prismaPet.energy],
      ),
    });

    return pet;
  }

  async create(pet: Pet): Promise<void> {
    await prisma.pet.create({
      data: {
        id: pet.id,
        name: pet.name,
        orgId: pet.orgId,
        state: pet.state,
        city: pet.city,
        size: petEnumMapperDomainToPrisma.prismaPetSizeMapper[pet.size],
        dependence: petEnumMapperDomainToPrisma.prismaPetDependenceMapper[pet.dependence], // enum mapping
        energy: petEnumMapperDomainToPrisma.prismaPetEnergyMapper[pet.energy], // enum mapping
        createdAt: pet.createdAt,
      },
    });
  }

  async findById(id: string): Promise<Pet | null> {
    const petFounded = await prisma.pet.findUnique({
      where: { id },
    });

    if (petFounded === null) return null;

    const pet = this.formatPet(petFounded);

    return pet;
  }

  async findByLocation(props: {
    location: LocationValueObject;
    query?: PetAvailableQuery;
  }): Promise<Pet[]> {
    const limit = props.query?.limit ?? 10;
    const page = props.query?.page ?? 1;

    const rawPets = await prisma.pet.findMany({
      where: {
        city: props.location.city,
        state: props.location.state,
        size: props.query?.size
          ? petEnumMapperDomainToPrisma.prismaPetSizeMapper[props.query.size.value]
          : undefined,
        dependence: props.query?.dependence
          ? petEnumMapperDomainToPrisma.prismaPetDependenceMapper[props.query.dependence.value]
          : undefined,
        energy: props.query?.energy
          ? petEnumMapperDomainToPrisma.prismaPetEnergyMapper[props.query.energy.value]
          : undefined,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const pets = rawPets.map(this.formatPet);

    return pets;
  }

  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: { id },
    });
  }
}
