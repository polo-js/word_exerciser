"use client";
import { Form } from 'radix-ui';

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Form.Root onSubmit={(e) => {
				console.log(e);
			}}>
				<div className="border border-gray-200 p-9">
					<div className="flex justify-center items-center flex-col pb-10 uppercase">
						<div className="font-bold pb-1">Закупочный английский</div>
						<hr className="self-stretch" />
						<div className="font-bold pt-5">Авторизация</div>
					</div>
					<div className="pb-20 w-[400px]">
						<Form.Field name="login" className="flex flex-col">
							<Form.Label>Логин</Form.Label>
							{/*<Form.Message match="valueMissing">Заполните логин</Form.Message>*/}
							<Form.Control
								required
								type="text"
								className="outline-0 border border-gray-200 p-1"
							/>
						</Form.Field>
						<Form.Field name="password" className="flex flex-col pt-6">
							<Form.Label>Пароль</Form.Label>
							{/*<Form.Message match="valueMissing">Заполните пароль</Form.Message>*/}
							<Form.Control
								className="outline-0 border border-gray-200 p-1"
								type="password"
								required
							/>
						</Form.Field>
						<div className="pt-6 flex justify-center">
							<Form.Submit asChild>
								<button className="border border-b-gray-800 px-3 py-2 cursor-pointer">
									Войти
								</button>
							</Form.Submit>
						</div>
					</div>
				</div>
			</Form.Root>
		</div>
	);
}
