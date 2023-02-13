<script lang="ts">
	import '@picocss/pico';

	import { Toaster } from 'svelte-french-toast';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Toaster />

<div class="stretch">
	<header>
		<nav>
			<ul>
				<li>
					<a href="/">Showcase</a>
				</li>
			</ul>
			{#if !data.user}
				<ul>
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/register">Register</a>
					</li>
				</ul>
			{:else}
				<ul>
					<li>
						<a href="/projects/new">Add Project</a>
					</li>
					<li>
						<details role="list" dir="rtl">
							<summary aria-haspopup="listbox" role="link">{data.user.username}</summary>
							<ul role="listbox">
								<li><a href="/my/projects">My Projects</a></li>
								<li><a href="/my/settings">My Settings</a></li>
								<li><form action="/logout" method="POST"><button>Logout</button></form></li>
							</ul>
						</details>
					</li>
				</ul>
			{/if}
		</nav>
	</header>
	<main class="sticky container">
		<slot />
	</main>
	<footer><p>Footer</p></footer>
</div>

<style>
	.stretch {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.sticky {
		flex: 1;
	}
</style>
