<script>
    import '../app.css';
    import Header from './Header.svelte';
    import Sidebar from '../lib/components/Sidebar.svelte';
    import UpdateNodesDrawer from '$lib/components/UpdateNodesDrawer.svelte';
	import { onMount } from 'svelte';
	
    let drawerHidden = false;
    let hideUpdateDrawer = true;

	
</script>

<header
    class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
    <Header bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex">
    <Sidebar bind:drawerHidden bind:hideUpdateDrawer />
    <div class="relative h-full w-full overflow-y-auto lg:ml-64 pt-[70px]">
        <slot />
    </div>
    <UpdateNodesDrawer bind:hideUpdateDrawer/>
</div>