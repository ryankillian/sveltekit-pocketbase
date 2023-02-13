<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h2>Reset Password</h2>
<p>We'll send a link via email to reset password</p>

{#if form?.success}
	<p>Please check your email inbox (check spam folder) for reset link</p>
	<p>Got to <a href="/login">Login Page</a></p>
{:else}
	<form action="?/resetPassword" method="POST">
		<label for="email">Email</label>
		<input type="email" id="email" name="email" />
		<button>Request Password Reset</button>
	</form>
{/if}
