<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h2>Register</h2>
<form action="?/register" method="POST">
	<Input
		type="email"
		id="email"
		label="Email"
		value={form?.data?.email ?? ''}
		errors={form?.errors?.email}
	/>
	<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
	<button>Register</button>
</form>
<p>Have an account already? <a href="/login">Log in</a></p>
