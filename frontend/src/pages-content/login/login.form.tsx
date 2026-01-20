'use client';
import { Form } from 'radix-ui';
import { useState } from 'react';
import { userServiceStore } from './user.service';

export function LoginForm() {
	const [userForm, setUserForm] = useState({ login: '', password: '' });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		void userServiceStore.login(userForm);
	};

	return (
		<Form.Root onSubmit={handleSubmit}>
			<div className="border border-gray-200 bg-gray-50 p-9 shadow-small-card">
				<div className="flex justify-center items-center flex-col pb-10 uppercase">
					<div className="font-bold pb-1">Закупочный английский</div>
					<hr className="self-stretch" />
					<div className="font-bold pt-5">Авторизация</div>
				</div>
				<div className="pb-20 w-[400px]">
					<Form.Field name="login" className="flex flex-col">
						<Form.Label>Логин</Form.Label>
						<Form.Control
							required
							type="text"
							className="outline-0 border border-gray-200 p-1"
							value={userForm.login}
							onChange={(e) => {
								setUserForm({ ...userForm, login: e.target.value });
							}}
						/>
						<Form.Message className="text-red-600 text-xs" match="valueMissing">
							Заполните логин
						</Form.Message>
					</Form.Field>
					<Form.Field name="password" className="flex flex-col mt-6">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							required
							className="outline-0 border border-gray-200 p-1"
							type="password"
							value={userForm.password}
							onChange={(e) => {
								setUserForm({ ...userForm, password: e.target.value });
							}}
						/>
						<Form.Message className="text-red-600 text-xs" match="valueMissing">
							Заполните пароль
						</Form.Message>
					</Form.Field>
					<div className="mt-10 flex justify-center">
						<Form.Submit asChild>
							<button className="text-white rounded-sm w-full bg-blue-600 px-3 py-2 cursor-pointer">
								Войти
							</button>
						</Form.Submit>
					</div>
				</div>
			</div>
		</Form.Root>
	);
}
