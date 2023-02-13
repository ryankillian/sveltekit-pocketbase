import { error, fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateFormData } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateFormData(
			await request.formData(),
			registerUserSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb
				.collection('users')
				.create({ passwordConfirm: formData.password, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};

// export const actions: Actions = {
// 	register: async ({ locals, request }) => {

// 		const formData = await request.formData();
// 		const email = formData.get('email') as string;
// 		const password = formData.get('password') as string;

// 		try {
// 			await locals.pb.collection('users').create({ passwordConfirm: password, password, email });
// 			await locals.pb.collection('users').requestVerification(email);
// 		} catch (err) {
// 			console.log('Error: ', err);
// 			throw error(500, 'Something went wrong');
// 		}

// 		throw redirect(303, '/login');
// 	}
// };
