import { serverFetch } from '@/shared/api/server-fetch';
import { toast } from 'sonner';

export class ExerciseService {
	_lastPromise?: Promise<any>;

	async addExerciseProgress(id: number) {
		if (this._lastPromise) {
			await this._lastPromise;
		}

		this._lastPromise = serverFetch('/progress/add-expression-progress', {
			method: 'POST',
			body: JSON.stringify({ id }),
		});

		const res = await this._lastPromise;
		this._lastPromise = void 0;

		if (!res.success) {
			toast.error('Что-то пошло не так при попытке сохранить прогресс!');
		}
	}

	async deleteExerciseProgress(id: number) {
		if (this._lastPromise) {
			await this._lastPromise;
		}

		this._lastPromise = serverFetch('/progress/delete-expression-progress', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
		});

		const res = await this._lastPromise;
		this._lastPromise = void 0;

		if (!res.success) {
			toast.error('Что-то пошло не так при попытке сохранить прогресс!');
		}
	}
}

export const exerciseService = new ExerciseService();
