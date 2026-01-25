import { IUser } from '@/shared/types/user';
import React from 'react';

export function namePretty(user: Pick<IUser, 'name' | 'lastname'>) {
	const { name, lastname } = user;
	if (lastname) {
		return `${name} ${lastname}`;
	}

	return name || 'User';
}

/**
 * Возвращает правильную форму слова по числу.
 * forms: [1, 2-4, 5-0]  ->  ["термин", "термина", "терминов"]
 */
export function pluralRu(n: number, forms: [string, string, string]): string {
	const abs = Math.abs(n);
	const lastTwo = abs % 100;
	const last = abs % 10;

	// 11–14 -> третья форма
	if (lastTwo >= 11 && lastTwo <= 14) return forms[2];

	if (last === 1) return forms[0];
	if (last >= 2 && last <= 4) return forms[1];
	return forms[2];
}

export function renderBoldFromPipes(text: string): React.ReactNode {
	const parts = text.split('|');

	if (parts.length % 2 === 0) {
		// некорректная разметка
		return text;
	}

	return parts.map((part, i) =>
		i % 2 === 1 ? React.createElement('b', { key: i }, part) : part
	);
}
