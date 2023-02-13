<script lang="ts">
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';

	export let data: PageData;
	export let form: ActionData;

	let emailModalOpen = false;
	let usernameModalOpen = false;
	let loading = false;

	const submitUpdateEmail: SubmitFunction = () => {
		loading = true;
		emailModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Success! Please check your email inbox');
					await invalidateAll();
					emailModalOpen = false;
					break;
				case 'error':
					toast.error('Something went wrong updating your email');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
	const submitUpdateUsername: SubmitFunction = () => {
		loading = true;
		usernameModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Username changed!');
					await invalidateAll();
					usernameModalOpen = false;
					break;
				case 'error':
					toast.error('Username already taken.');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<h3>Change Email</h3>
<button on:click={() => (emailModalOpen = !emailModalOpen)}>Change Email</button>
{#if emailModalOpen}
	<dialog open>
		<article>
			<h3>Change Your Email</h3>
			<form action="?/updateEmail" method="POST" use:enhance={submitUpdateEmail}>
				<label for="email">Enter your new email address</label>
				<Input
					type="email"
					label="email"
					id="email"
					required
					value={data?.user?.email ?? ''}
					disabled={loading}
					errors={form?.errors?.emailErrors?.email}
				/>
				<footer>
					<a
						on:click|preventDefault={() => (emailModalOpen = false)}
						href="#cancel"
						role="button"
						class="secondary">Cancel</a
					>
					<button disabled={loading}>Change my Email</button>
				</footer>
			</form>
		</article>
	</dialog>
{/if}
<h3>Change Username</h3>
<input type="text" value={data?.user?.username ?? ''} disabled />
<button on:click={() => (usernameModalOpen = !usernameModalOpen)}>Change Username</button>
{#if usernameModalOpen}
	<dialog open>
		<article>
			<h3>Change Your Username</h3>
			<form action="?/updateUsername" method="POST" use:enhance={submitUpdateUsername}>
				<label for="username"
					>Enter your new user name
					<Input
						label="username"
						id="username"
						required
						disabled={loading}
						errors={form?.errors?.usernameErrors?.username}
					/>
				</label>
				<footer>
					<a
						on:click|preventDefault={() => (usernameModalOpen = false)}
						href="#cancel"
						role="button"
						class="secondary">Cancel</a
					>
					<button disabled={loading}>Change my Username</button>
				</footer>
			</form>
		</article>
	</dialog>
{/if}
