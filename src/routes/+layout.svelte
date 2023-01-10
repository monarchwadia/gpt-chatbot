<script>
  import 'src/app.css';
	import Navbar from './Navbar.svelte';
</script>

<div class="flex flex-col gap-12 justify-around p-4 max-w-4xl m-auto h-full">
  <Navbar />
  <slot />
</div>
