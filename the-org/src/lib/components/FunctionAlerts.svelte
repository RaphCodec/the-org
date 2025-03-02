<script>
  import { Alert } from 'flowbite-svelte';
  export let message = 'Default alert!';
  export let color = 'red';
</script>

<Alert color={color}> 
  <span class="font-medium">{message}</span>
</Alert>