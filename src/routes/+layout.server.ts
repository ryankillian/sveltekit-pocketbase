import type { LayoutServerLoad } from './$types';
// import type { User } from '$lib/types';

export const load: LayoutServerLoad = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};
