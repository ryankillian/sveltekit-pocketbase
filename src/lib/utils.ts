import type { z, ZodError } from 'zod';

const { randomBytes } = await import('node:crypto');

export const serializeNonPOJOs = <T>(obj: T): T => {
	return structuredClone(obj);
};

export const generateUsername = (name: string) => {
	const id = randomBytes(8).toString('hex');
	return `${name.slice(0, 2)}${id}`;
};

// export const validateFormData = async <T extends z.ZodTypeAny>(
// 	formData: FormData,
// 	schema: T
// ): Promise<{ formData: z.infer<T>; errors: z.inferFlattenedErrors<typeof schema> | null }> => {
// 	const body = formData;

// 	console.log('body', body);

// 	try {
// 		const formData = schema.parse(body);
// 		return {
// 			formData,
// 			errors: null
// 		};
// 	} catch (err) {
// 		console.log('Error:', err);
// 		const errors = (err as ZodError).flatten();
// 		return {
// 			formData: body,
// 			errors
// 		};
// 	}
// };

export const validateFormData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
): Promise<{ formData: z.infer<T>; errors: z.inferFlattenedErrors<typeof schema> | null }> => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = (err as ZodError).flatten();
		return {
			formData: body,
			errors
		};
	}
};
