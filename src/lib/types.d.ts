import type { Record } from 'pocketbase';
import type { z } from 'zod';

import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';

interface User extends Record {
	id: string;
	name: string;
	avatar?: string;
	username: string;
	// bio?: string;
	// website?: string;
	// twitter?: string;
	// youtube?: string;
	// github?: string;
}

type UpdateEmailErrors = z.inferFlattenedErrors<typeof updateEmailDto>['fieldErrors'];
type UpdateUsernameErrors = z.inferFlattenedErrors<typeof updateUsernameDto>['fieldErrors'];

interface UpdateAccountActionData {
	data?: UpdateEmailDto | UpdateUsernameDto;
	errors?: {
		emailErrors?: UpdateEmailErrors;
		usernameErrors?: UpdateUsernameErrors;
	};
	success?: boolean;
}
