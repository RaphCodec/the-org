<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-svelte';

	export let name: string = ''; 
	export let avatar: string = ''; 
	export let github: string = ''; 
	export let linkedin: string = '';
	export let title: string = '';
	
</script>

<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
	<Avatar size="sm" src={avatar} tabindex={0} />
</button>
<Dropdown placement="bottom-end">
	<DropdownHeader>
		<span class="block text-sm">{name}</span>
        <span class="block truncate text-xs font-medium">{title}</span>
	</DropdownHeader>
	<DropdownItem href={github}>GitHub</DropdownItem>
	<DropdownItem href={linkedin}>LinkedIn</DropdownItem>
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte-admin-dashboard.vercel.app/)
## Props
@prop export let id: number = 0;
@prop export let name: string = '';
@prop export let avatar: string = '';
@prop export let email: string = '';
@prop export let biography: string = '';
@prop export let position: string = '';
@prop export let country: string = '';
@prop export let status: string = '';
-->