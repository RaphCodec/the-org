<script lang="ts">
	import {
		DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import '../app.css';

	import Profile from '../lib/components/utils/widgets/Profile.svelte';

	import logo from '$lib/images/RC Logo.jpeg';
	import Profiles from './data/profile.json';

	import { filterChart } from '$lib/components/org-chart-functions';

	export let fluid = true;
	export let drawerHidden = false;
	export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavHamburger
		onClick={() => (drawerHidden = !drawerHidden)}
		class="m-0 me-3 md:block lg:hidden"
	/>
	<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
		<img
			src="{logo}"
			class="me-2.5 h-6 sm:h-8 rounded-full"
			alt="Flowbite Logo"
		/>
		<span
			class="ml-px self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl"
		>
			The Org
		</span>
	</NavBrand>
	<div class="hidden lg:block lg:ps-3">
			<form>
				<Search size="md" class="mt-1 w-96 border focus:outline-none" on:input={filterChart}/>
			</form>
	</div>
	<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
		<!-- <Notifications /> -->
		<!-- <AppsMenu /> -->
		<DarkMode />
		<Profile {...Profiles[0]} />
	</div>
</Navbar>