"use server";

import { revalidateTag } from "next/cache";

export async function updateData(tag: string) {
	revalidateTag(tag);
}