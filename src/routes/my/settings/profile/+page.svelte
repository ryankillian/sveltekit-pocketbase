<script lang="ts">
	import 'iconify-icon';
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import Input from '$lib/components/Input.svelte';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	$: loading = false;

	const submitUpdateProfile: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Updated profile!');
					await invalidateAll();
					await applyAction(result);
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<h3>Update Profile</h3>
<form action="?/updateProfile" method="POST" use:enhance={submitUpdateProfile}>
	<label for="name">Current Name</label>
	<input type="text" id="name" name="oldName" value={data?.user?.name} disabled />
	<Input
		id="name"
		label="Name"
		value={form?.data?.name ?? ''}
		disabled={loading}
		errors={form?.errors?.name}
	/>
	<button disabled={loading} aria-busy={loading}>Update Profile</button>
</form>
