<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchFiltersStore} from '../../../stores/search-filters.store';
	import {track} from '@core/api';
	import Dropdown from '@components/shared/dropdown.svelte';

	let dropdown;
	let buttonTitle;
	let filterButton;

	const UpdatedTimeOptions: { label: string, value: typeof SearchFilter.LastUpdateTime }[] = [
		{
			label: 'Any time',
			value: SearchFilter.LastUpdateTime.None
		},
		{
			label: 'Within today',
			value: SearchFilter.LastUpdateTime.Today
		},
		{
			label: 'Within one week',
			value: SearchFilter.LastUpdateTime.PastWeek
		},
		{
			label: 'Within 1 month',
			value: SearchFilter.LastUpdateTime.PastMonth
		},
		{
			label: 'Within 3 months',
			value: SearchFilter.LastUpdateTime.Past3Months
		},
		{
			label: 'Within 6 months',
			value: SearchFilter.LastUpdateTime.Past6Months
		},
		{
			label: 'Within 1 year',
			value: SearchFilter.LastUpdateTime.PastYear
		},
		{
			label: 'Within 2 years',
			value: SearchFilter.LastUpdateTime.Past2Years
		},
	];

	$: {
		buttonTitle = $searchFiltersStore.lastUpdated === SearchFilter.LastUpdateTime.None ? 'Last updated time' : UpdatedTimeOptions.find(option => option.value === $searchFiltersStore.lastUpdated).label;
	}

	function setFilterValue(lastUpdated: typeof SearchFilter.LastUpdateTime)
		{
			dropdown.close();
			$searchFiltersStore.lastUpdated = lastUpdated;
			void track({event: EventName.ClickFilterUpdateStatus});
		}
</script>

<button class="btn-filter btn filter-button" on:click={dropdown.open} bind:this={filterButton}>
    {buttonTitle}
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>
<Dropdown bind:this={dropdown} hostElm="{filterButton}">
    {#each UpdatedTimeOptions as {label, value}}
        <li on:click={() => setFilterValue(value)} class:active={$searchFiltersStore.lastUpdated === value}>
            <span class="fe {$searchFiltersStore.lastUpdated === value ? 'fe-check' : ''} checkbox"></span>
            <span>{label}</span>
        </li>
    {/each}
</Dropdown>

<style lang="scss">
</style>
