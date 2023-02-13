import { error, fail, redirect } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/schemas';
import { validateFormData } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import type { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateFormData(
			await request.formData(),
			updatePasswordSchema
		);

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			const e = err as ClientResponseError;
			console.log('Error: ', e.data.data);
			throw error(e.status, e.data.message);
		}

		throw redirect(303, '/login');
	}
};
