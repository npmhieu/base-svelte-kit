<script>
	import Search from '@components/Search.svelte';
	import {pageStore} from '@stores/page.store';
	import {CurrentPage} from "@core/constants";
	pageStore.setCurrentPage({
		currentPage: CurrentPage.SearchPage
	});
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>



<Search/>
<!--<script>-->
<!--	let characterName = '';-->

<!--	fetch('https://swapi.dev/api/people/1')-->
<!--			.then((response) => response.json())-->
<!--			.then((character) => {-->
<!--				characterName = character.name;-->
<!--			})-->
<!--</script>-->
<!--<main>-->
<!--	{characterName}-->
<!--</main>-->