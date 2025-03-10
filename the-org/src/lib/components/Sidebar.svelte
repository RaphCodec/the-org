<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import {
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
	} from 'flowbite-svelte';
	import {
		AngleDownOutline,
		AngleUpOutline,
		FileImageSolid,
		ImageSolid,
		GithubSolid,
		EyeSlashSolid,
		TableColumnSolid,
		UsersSolid,
		UserEditSolid,
		FilePdfSolid,
		DatabaseSolid
	} from 'flowbite-svelte-icons';

	import {
		expandAll,
		collapseAll,
		fitChart,
		rotateChart,
		compactChart,
		zoomInChart,
		zoomOutChart,
		clearHighlights,
		exportSVG,
		exportPNG,
		exportPDF,
		removeSelected,
		addToSelected,
		currentlySelected,
		toggleSalaries,
		toggleReports,
		undo,
		redo,
		undoActions,
		redoActions,
		displayLineage,
		exportNodeData,
		getSupervisors
	} from './org-chart-functions';

	import SelectionAlert from './FunctionAlerts.svelte';
	
	export let hideUpdateDrawer: boolean = true;
	export let drawerHidden: boolean = false;

	let showAlert = false;
	let alertMessage = '';
	let alertType = 'success';

	const closeDrawer = () => {
		drawerHidden = true;
	};

	export const showAlertMessage = (message: string, type: string = 'success') => {
		alertMessage = message;
		alertType = type;
		showAlert = true;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	let iconClass =
		'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
	let itemClass =
		'flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
	let groupClass = 'pt-2 space-y-2';

	$: mainSidebarUrl = page.url.pathname;
	let activeMainSidebar: string;

	afterNavigate((navigation) => {
		// this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		closeDrawer();

		activeMainSidebar = navigation.to?.url.pathname ?? '';
	});

	let posts = [
		{
			name: 'Chart View',
			icon: TableColumnSolid,
			children: {
				'Fit Chart': { onclick: fitChart },
				'Rotate Chart': { onclick: rotateChart },
				'Compact Layout': { onclick: compactChart },
				'Zoom In': { onclick: zoomInChart },
				'Zoom Out': { onclick: zoomOutChart },
				'Expand All': { onclick: expandAll },
				'Collapse All': { onclick: collapseAll },
				'Toggle Salaries': { onclick: toggleSalaries },
				'Toggle Reports': { onclick: toggleReports },
			}
		},
		{
			name: 'Edit Nodes',
			icon: UsersSolid,
			children: {
				'Edit Selected': { onclick: () => {
					if (currentlySelected.length === 1) {
						getSupervisors();
						hideUpdateDrawer = false;
					} else {
						showAlertMessage('Please select only one node to edit.', 'error');
					}
				}},
				'Add Node Above': { onclick: () => {
					if (currentlySelected.length === 1) {
						addToSelected('parent');
						showAlertMessage('Node added above successfully', 'success');
					} else {
						showAlertMessage('Please select only one node to add a node above', 'error');
					}
				}},
				'Add Node Below': { onclick: () => {
					if (currentlySelected.length === 1) {
						addToSelected();
						showAlertMessage('Node added below successfully', 'success');
					} else {
						showAlertMessage('Please select only one node to add a node below', 'error');
					}
				}},
				'Delete Node(s)': { onclick: () => {
					if (currentlySelected.length === 0) {
						showAlertMessage('Please select a node to remove.', 'error');
					} else {
						removeSelected();
						showAlertMessage('Nodes Removed.', 'warning');
					}
				}},
				'Display Lineage': { onclick: () => {
					if (currentlySelected.length === 1) {
						displayLineage();
						showAlertMessage(`Displaying Lineage for: ${currentlySelected[0].data.name}.`, 'success');
					} else {
						showAlertMessage('Please select only one node to display lineage.', 'error');
					}
				}},
				'Undo': { onclick: () => {
					if (undoActions.length === 0) {
						showAlertMessage('Nothing to Undo.', 'error');
					} else {
						const lastAction = undoActions[undoActions.length - 1];
						undo();
						showAlertMessage(`Last Action (${lastAction.action}) Undone.`);
					}
				}},
				'Redo': { onclick: () => {
					if (redoActions.length === 0) {
						showAlertMessage('Nothing to Redo.', 'error');
					} else {
						const lastAction = redoActions[redoActions.length - 1];
						redo();
						showAlertMessage(`Last Action (${lastAction.action}) Redone.`);
					}
				}}
			}
		},
		{ name: 'Clear Highlights', icon: EyeSlashSolid, onclick: () => {
			clearHighlights();
			showAlertMessage('Chart Selections cleared.', 'warning');
		}},
		{ name: 'Export SVG', icon: FileImageSolid, onclick: () => {
			exportSVG();
			showAlertMessage('Chart exported as SVG');
		}},
		{ name: 'Export PNG', icon: ImageSolid, onclick: () => {
			exportPNG();
			showAlertMessage('Chart exported as PNG');
		}},
		{ name: 'Export PDF', icon: FilePdfSolid, onclick: () => {
			exportPDF();
			showAlertMessage('Chart exported as PDF')}},
		{ name: 'Export Data', icon: DatabaseSolid, onclick: () => {
			exportNodeData();
			showAlertMessage('Chart exported as PNG');
		}}
	];

	let links = [
		{
			label: 'GitHub Repository',
			href: 'https://github.com/RaphCodec/the-org',
			icon: GithubSolid
		},
	];
	let dropdowns = Object.fromEntries(Object.keys(posts).map((x) => [x, false]));
</script>

<Sidebar
	class={drawerHidden ? 'hidden' : ''}
	activeUrl={mainSidebarUrl}
	activeClass="bg-gray-100 dark:bg-gray-700"
	asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-16 lg:block"
>
	<h4 class="sr-only">Main menu</h4>
	<SidebarWrapper
		divClass="overflow-y-auto px-3 pt-20 lg:pt-5 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] lg:block dark:bg-gray-800 lg:me-0 lg:sticky top-2"
	>
		<nav class="divide-y divide-gray-200 dark:divide-gray-700">
			<SidebarGroup ulClass={groupClass} class="mb-3">
				{#each posts as { name, icon, children, onclick } (name)}
					{#if children}
						<SidebarDropdownWrapper bind:isOpen={dropdowns[name]} label={name} class="pr-3">
							<AngleDownOutline slot="arrowdown" strokeWidth="3.3" size="sm" />
							<AngleUpOutline slot="arrowup" strokeWidth="3.3" size="sm" />
							<svelte:component this={icon} slot="icon" class={iconClass} />

							{#each Object.entries(children) as [title, { onclick }]}
								<SidebarItem
									label={title}
									spanClass="ml-9"
									class={itemClass}
									on:click={onclick}
								/>
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem
							label={name}
							spanClass="ml-3"
							class={itemClass}
							on:click={onclick}
						>
							<svelte:component this={icon} slot="icon" class={iconClass} />
						</SidebarItem>
					{/if}
				{/each}
			</SidebarGroup>
			<SidebarGroup ulClass={groupClass}>
				{#each links as { label, href, icon } (label)}
					<SidebarItem
						{label}
						{href}
						spanClass="ml-3"
						class={itemClass}
						target="_blank"
					>
						<svelte:component this={icon} slot="icon" class={iconClass} />
					</SidebarItem>
				{/each}
			</SidebarGroup>
		</nav>
	</SidebarWrapper>
</Sidebar>

{#if showAlert && alertType === 'error'}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<SelectionAlert message={alertMessage}/>
	</div>
{:else if showAlert && alertType === 'success'}
	<div class="fixed bottom-4 right-4 z-50">
		<SelectionAlert message={alertMessage} color="green" />
	</div>
{:else if showAlert && alertType === 'warning'}
	<div class="fixed bottom-4 right-4 z-50">
		<SelectionAlert message={alertMessage} color="yellow" />
	</div>
{/if}

<div
	hidden={drawerHidden}
	class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
	on:click={closeDrawer}
	on:keydown={closeDrawer}
	role="presentation"
></div>
