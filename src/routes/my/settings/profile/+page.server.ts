import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { updateProfileSchema } from '$lib/schemas';
import { validateFormData } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const body = await request.formData();

		const { formData, errors } = await validateFormData(body, updateProfileSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const { name } = await locals.pb
				.collection('users')
				.update(locals.user?.id as string, formData);
			locals.user && (locals.user.name = name);
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return {
			success: true
		};
	}
};
