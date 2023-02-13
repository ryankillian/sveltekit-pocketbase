<script lang="ts">
	export let label: string;
	export let id: string;
	export let value = '';
	export let disabled = false;
	export let errors: Array<String> | undefined;
</script>

<label for={id}>{label}</label>
<textarea
	{id}
	name={id}
	{value}
	rows="5"
	cols="35"
	{disabled}
	aria-invalid={errors ? 'true' : 'spelling'}
/>
{#if errors}
	{#each errors as error}
		<label for={id}><small><span class="error">{error}</span></small></label>
	{/each}
{/if}

<style>
	.error {
		color: var(--form-element-invalid-border-color);
	}
</style>
