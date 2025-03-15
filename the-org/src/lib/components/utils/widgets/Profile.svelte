<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-svelte';

	export let name: string = ''; 
	export let avatar: string = ''; 
	export let github: string = ''; 
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
</Dropdown>
