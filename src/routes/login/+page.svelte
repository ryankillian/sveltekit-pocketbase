<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h2>Log in</h2>
<form action="?/login" method="POST">
	<Input
		type="email"
		id="email"
		label="Email"
		value={form?.data?.email ?? ''}
		errors={form?.errors?.email}
	/>
	<fieldset>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
		<a href="reset-password">Forgot Password?</a>
	</fieldset>
	<button>Login</button>
	{#if form?.notVerified}
		<p class="error">Please verify your email address before login (check spam folder)</p>
	{/if}
</form>
<p>Don't have an account? <a href="/register">Sign up</a></p>

<style>
	.error {
		color: var(--form-element-invalid-border-color);
	}
</style>
