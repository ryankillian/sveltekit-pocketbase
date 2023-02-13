<script lang="ts">
	export let label: string;
	export let type = 'text';
	export let id: string;
	export let value = '';
	export let disabled = false;
	export let required = false;
	export let errors: string[] = [];
</script>

<label for={id}>{label}</label>
<input {type} {id} name={id} {value} {required} {disabled} />
{#if errors}
	{#each errors as error}
		<!-- <small for={id}><span class="error">{error}</span></small> -->
		<small><span class="error">{error}</span></small>
	{/each}
{/if}

<style>
	.error {
		color: var(--form-element-invalid-border-color);
	}
</style>
