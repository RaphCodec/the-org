<script lang="ts">
	import {
		DarkMode,
		NavBrand,
		NavHamburger,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import { ShareNodesSolid } from 'flowbite-svelte-icons';
	import '../app.css';

	import Profile from '../lib/components/utils/widgets/Profile.svelte';

	import Profiles from './data/profile.json';

	import { filterChart } from '$lib/components/org-chart-functions';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default">
	<NavHamburger
		onClick={() => (drawerHidden = !drawerHidden)}
		class="m-0 me-3 md:block lg:hidden"
	/>
	<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
		<ShareNodesSolid />
		<span
			class="ml-px self-center text-xl font-semibold whitespace-nowrap sm:text-2xl dark:text-white"
		>
			The Org
		</span>
	</NavBrand>
	<div class="hidden lg:block lg:ps-3">
		<form>
			<Search size="md" class="mt-1 w-96 border focus:outline-none" on:input={filterChart} />
		</form>
	</div>
	<div class="ms-auto flex items-center text-gray-500 sm:order-2 dark:text-gray-400">
		<DarkMode />
		<Profile {...Profiles[0]} />
	</div>
</Navbar>
