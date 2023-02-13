<script lang="ts">
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import Input from '$lib/components/Input.svelte';

	import type { ActionData } from './$types';
	export let form: ActionData;

	let loading = false;

	const submitUpdatePassword: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Password updated successfully!');
					await invalidateAll();
					break;
				case 'redirect':
					toast.success('Password updated successfully!');
					await invalidateAll();
					break;
				case 'error':
					toast.error('Could not change password. Please check your credentials and try again.');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<h3>Update password</h3>
<form action="?/updatePassword" method="POST" use:enhance={submitUpdatePassword}>
	<Input
		id="oldPassword"
		label="Old Password"
		type="password"
		required
		errors={form?.errors?.oldPassword}
	/>
	<Input
		id="password"
		label="New Password"
		type="password"
		required
		errors={form?.errors?.password}
	/>
	<Input
		id="passwordConfirm"
		label="Confirm Password"
		type="password"
		required
		errors={form?.errors?.passwordConfirm}
	/>
	<button disabled={loading}>Update password</button>
</form>
<a href="/reset-password">Forgot password?</a>
