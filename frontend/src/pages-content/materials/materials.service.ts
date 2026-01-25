import { serverFetch } from '@/shared/api/server-fetch';
import { toast } from 'sonner';

class MaterialsService {
	async addMaterialProgress(id: number): Promise<void> {
		const res = await serverFetch('/progress/add-materials-progress', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ id }),
		});

		if (!res.success) {
			toast.error('Что-то пошло не так при попытке сохранить прогресс!');
		}
	}

	async deleteMaterialProgress(id: number): Promise<void> {
		const res = await serverFetch('/progress/delete-materials-progress', {
			method: 'DELETE',
			credentials: 'include',
			body: JSON.stringify({ id }),
		});

		if (!res.success) {
			toast.error('Что-то пошло не так при попытке сохранить прогресс!');
			return;
		}
	}
}

export const materialsService = new MaterialsService();
