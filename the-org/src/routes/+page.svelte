<script lang="ts">
	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownItem, SidebarDropdownWrapper } from 'flowbite-svelte';
	import { ChartPieSolid, CartSolid, ChevronDoubleUpOutline, ChevronDoubleDownOutline } from 'flowbite-svelte-icons';
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
</script>

<svelte:head>
	<title>The Org</title>
	<meta name="description" content="The Org - Organization Management Application" />
</svelte:head>

<Sidebar>
	<SidebarWrapper>
	  <SidebarGroup>
		<SidebarItem label="Dashboard">
		  <svelte:fragment slot="icon">
			<ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
		  </svelte:fragment>
		</SidebarItem>
		<SidebarDropdownWrapper label="E-commerce">
		  <svelte:fragment slot="icon">
			<CartSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
		  </svelte:fragment>
		  <svelte:fragment slot="arrowup">
			<ChevronDoubleUpOutline class="w-6 h-6" />
		  </svelte:fragment>
		  <svelte:fragment slot="arrowdown">
			<ChevronDoubleDownOutline class="w-6 h-6" />
		  </svelte:fragment>
		  <SidebarDropdownItem label="Products" />
		  <SidebarDropdownItem label="Billing" />
		  <SidebarDropdownItem label="Invoice" />
		</SidebarDropdownWrapper>
	  </SidebarGroup>
	</SidebarWrapper>
  </Sidebar>



