<script>
  import { Drawer, Button, CloseButton, Label, Input, Search, List, Li } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';
  import { currentlySelected, updateInfo, currentSupervisor, people } from './org-chart-functions';

  export let hideUpdateDrawer = true;
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

  let search = '';
  $: filteredPeople = people.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  function selectSupervisor(name) {
    console.log(name);
    search = name;
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateInfo();
    hideUpdateDrawer = true;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
</script>
  
<Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden={hideUpdateDrawer} id="sidebar4">
    <div class="flex items-center">
      <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        <InfoCircleSolid class="w-5 h-5 me-2.5" />Update Information
      </h5>
      <CloseButton 
        on:click={() => (hideUpdateDrawer = true)} 
        on:keydown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            hideUpdateDrawer = true;
          }
        }}
        class="mb-4 dark:text-white" 
      />
    </div>
    <form action="#" class="mb-6" on:submit={handleSubmit}>
      <div class="mb-6">
        <Label for="update-Name" class="block mb-2">Name</Label>
        <Input id="update-Name" name="update-Name" placeholder={currentlySelected[0].data.name} on:keydown={handleKeyDown} />
      </div>
      <div class="mb-6">
        <Label for="update-title" class="block mb-2">Title</Label>
        <Input id="update-title" name="update-title" placeholder={currentlySelected[0].data.position} on:keydown={handleKeyDown} />
      </div>
      <div class="mb-6">
        <Label for="update-supervisor" class="block mb-2">Supervisor</Label>
        <Input id="update-supervisor" name="update-supervisor" placeholder={currentSupervisor} bind:value={search} on:keydown={handleKeyDown} />
        <div id="searchResults" class="scrollable-results mt-2 dark:text-white list-none" style="cursor:pointer; max-height: 200px; overflow-y: auto;">
          {#if search.length > 0}
            {#each filteredPeople as person}
            <div on:click={() => selectSupervisor(person.name)} on:keydown={(e) => e.key === 'Enter' && selectSupervisor(person.name)}><Li>{person.name}</Li></div>
            {/each}
          {/if}
        </div>
      </div>
      <div class="mb-6">
        <Label for="update-salary" class="block mb-2">Salary</Label>
        <Input id="update-salary" name="update-salary" type="number" placeholder={currentlySelected[0].data.salary?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} on:keydown={handleKeyDown} />
      </div>
      <Button type="submit" class="w-full">
        Update Info
      </Button>
    </form>
</Drawer>