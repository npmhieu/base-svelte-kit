<script lang='ts'>
	import {onMount} from 'svelte';
	import 'virtual:windi.css';
	import '@styles/main.scss';
	import { page } from '$app/stores';
	import '@core/extentions';
</script>
<main class='w-full mx-auto'>
	<slot />
</main>
