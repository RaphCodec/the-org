<script>
  import { Drawer, Button, CloseButton, Label, Input, Search } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';
  import { currentlySelected, updateInfo, getCurrentChartData } from './org-chart-functions';

  export let hideUpdateDrawer = true;
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

  let supervisor = 'test';

  // Example usage of getCurrentChartData
  // let currentData = () => getCurrentChartData();
  // console.log(currentData);
</script>
  
<Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden={hideUpdateDrawer} id="sidebar4">
    <div class="flex items-center">
      <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        <InfoCircleSolid class="w-5 h-5 me-2.5" />Update Information
      </h5>
      <CloseButton on:click={() => (hideUpdateDrawer = true)} class="mb-4 dark:text-white" />
    </div>
    <form action="#" class="mb-6">
      <div class="mb-6">
        <Label for="update-Name" class="block mb-2">Name</Label>
        <Input id="update-Name" name="update-Name" placeholder={currentlySelected[0].data.name} />
      </div>
      <div class="mb-6">
        <Label for="update-title" class="block mb-2">Title</Label>
        <Input id="update-title" name="update-title" placeholder={currentlySelected[0].data.position} />
      </div>
      <!-- <div class="mb-6">
        <Label for="update-supervisor" class="block mb-2">Supervisor</Label>
        <Input id="update-supervisor" name="update-supervisor" placeholder={supervisor} />
      </div> -->
      <div class="mb-6">
        <Label for="update-salary" class="block mb-2">Salary</Label>
        <Input id="update-salary" name="update-salary" type="number" placeholder={currentlySelected[0].data.salary?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
      </div>
      <Button type="submit" class="w-full" on:click={() => {
        updateInfo();
        hideUpdateDrawer = true;
      }} >
        Update Info
      </Button>
    </form>
</Drawer>