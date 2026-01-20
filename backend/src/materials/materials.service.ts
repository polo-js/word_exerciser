import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MaterialDto, MaterialsInfoDto } from './schemas/materials.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProgressService } from '../progress/progress.service';
import { handleError, plainObjectToDTO } from '../shared/utils';
import { ReferenceMaterial } from '@prisma/client';

@Injectable()
export class MaterialsService {
	constructor(
		private readonly usersService: UsersService,
		private readonly prismaService: PrismaService,
		private readonly progressService: ProgressService
	) {}

	async getMaterialsInfo(userLogin: string): Promise<MaterialsInfoDto> {
		const user = await this.usersService.findByLogin(userLogin);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		let [materialsProgress, materialsCount, materialList] = await Promise.all([
			this.progressService.getReferenceMaterialProgress(user.id),
			this.progressService.getReferenceMaterialCount(),
			this.getMaterials(),
		]);

		if (materialsProgress.length > materialsCount) {
			handleError('Material progress length cannot be more than overall count');
			materialsProgress.length = materialsCount;
		}

		const materials: MaterialDto[] = materialList.map(
			(material: ReferenceMaterial): MaterialDto => {
				const marked = materialsProgress.some(({ id }) => material.id === id);
				return { ...material, marked };
			}
		);
		const progress: number = materialsCount
			? materialsProgress.length / materialsCount * 100
			: 0;

		const result: MaterialsInfoDto = {
			progress,
			materials,
		};

		return plainObjectToDTO(MaterialsInfoDto, result);
	}

	getMaterials(): Promise<ReferenceMaterial[]> {
		return this.prismaService.referenceMaterial.findMany();
	}
}
