<script lang="ts">
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account'
		},
		{
			title: 'Security',
			href: '/my/settings/security'
		}
	];
</script>

<h2>Settings</h2>
<div class="grid">
	<aside>
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					role="button"
					class="contrast {$page.url.pathname === navItem.href ? '' : 'outline'}">{navItem.title}</a
				>
			</li>
		{/each}
	</aside>

	<section>
		<slot />
	</section>
</div>

<style>
	@media (min-width: 992px) {
		.grid {
			grid-column-gap: 3rem;
			grid-template-columns: 25% auto;
		}
	}
</style>
