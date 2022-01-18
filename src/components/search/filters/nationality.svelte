<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchQueryStore} from '../../../stores/search-filters.store';
	import {search} from '@stores/user-search.store';
	import {track} from '@core/api';
	import Dropdown from '@components/shared/dropdown.svelte';

	let dropdown;
	let buttonTitle;
	let filterButton;

	const nationalityOptions: { label: string, value: typeof SearchFilter.Nationality }[] = [
		{
			label: 'Nationality',
			value: SearchFilter.Nationality.None
		},
		{
			label: 'Vietnamese',
			value: SearchFilter.Nationality.Vietnamese
		},
		{
			label: 'Expat',
			value: SearchFilter.Nationality.Expat
		},
	];

	$: {
		buttonTitle = nationalityOptions.find(option => option.value === $searchQueryStore.isVietnamese).label;
	}

	function setFilterValue(isVietnamese: typeof SearchFilter.Nationality)
		{
			dropdown.close();
			$searchQueryStore.isVietnamese = isVietnamese;
			search();
			void track({event: EventName.ClickFilterNationality});
		}
</script>

<button class="btn-filter btn filter-button" on:click={dropdown.open} bind:this={filterButton}>
    {buttonTitle}
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>
<Dropdown bind:this={dropdown} hostElm="{filterButton}">
    {#each nationalityOptions as {label, value}}
        <li on:click={() => setFilterValue(value)} class:active={$searchQueryStore.isVietnamese === value}>
            <span class="fe {$searchQueryStore.isVietnamese === value ? 'fe-check' : ''} checkbox"></span>
            <span>{label}</span>
        </li>
    {/each}
</Dropdown>

<style lang="scss">
</style>
