<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchQueryStore, searchFiltersStore} from '../../../stores/search-filters.store';
	import {search} from '@stores/user-search.store';
	import {track} from '@core/api';
	import Dropdown from '@components/shared/dropdown.svelte';

	let filterButton;
	let dropdown;
	let selectedLanguage: Object = $searchQueryStore.language.toObject(true);

	function setFilterValue(value: string)
		{
			selectedLanguage[value] = !selectedLanguage[value];
		}

	function openDropdown()
		{
			dropdown.open();
			track({event: EventName.ClickFilterLanguage});
		}

	function onReset()
		{
			dropdown.close();
			selectedLanguage = {};
			searchFiltersStore.update({
				language: []
			})

		}

	function onClose()
		{
			searchFiltersStore.update({
				language: selectedLanguage.getOwnKey().filter(key => selectedLanguage[key]).map(lang => '' + lang)
			})
			search();
		}
</script>

<button class="btn-filter btn filter-button" on:click={openDropdown} bind:this={filterButton}>
    {$searchQueryStore.language.length ? `(${$searchQueryStore.language.length})` : ''} Language
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>


<Dropdown bind:this={dropdown} hostElm="{filterButton}" multiple={true} on:close={onClose}>
    {#if $searchFiltersStore.language.length}
        <li on:click={onReset}>
            Clear
        </li>
    {/if}
    {#each SearchFilter.Languages as {name, id}}
        <li on:click={() => setFilterValue(id)} class:active={selectedLanguage[id]}>
            <span class="fe checkbox" class:fe-check={selectedLanguage[id]}></span>
            <span>{name}</span>
        </li>
    {/each}
</Dropdown>

<style lang="scss">
</style>
