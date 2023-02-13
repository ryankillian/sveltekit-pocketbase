import { error, fail, redirect } from '@sveltejs/kit';
import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import { validateFormData } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import type { ClientResponseError } from 'pocketbase';
import type { UpdateAccountActionData } from '$lib/types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	updateEmail: async ({ request, locals }): Promise<UpdateAccountActionData> => {
		const { formData, errors } = await validateFormData(
			await request.formData(),
			updateEmailSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: {
					emailErrors: errors.fieldErrors
				}
			});
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.data.message);
		}

		return {
			success: true,
			data: formData
		};
	},
	updateUsername: async ({ request, locals }): Promise<UpdateAccountActionData> => {
		const { formData, errors } = await validateFormData(
			await request.formData(),
			updateUsernameSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: {
					usernameErrors: errors.fieldErrors
				}
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, formData);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.data.message);
		}

		return {
			success: true,
			data: formData
		};
	}
};
