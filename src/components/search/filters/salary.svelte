<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {search} from '@stores/user-search.store';
	import {searchQueryStore, searchFiltersStore} from '../../../stores/search-filters.store';
	import {track} from '@core/api';
	import Dropdown from '@components/shared/dropdown.svelte';

	let filterButton;
	let dropdown;
	let selectedSalary: Object = $searchQueryStore.salary.toObject(true);

	function setFilterValue(value: string)
		{
			selectedSalary[value] = !selectedSalary[value];
		}

	function openDropdown()
		{
			dropdown.open();
			track({event: EventName.ClickFilterSalary});
		}

	function onReset()
		{
			dropdown.close();
			selectedSalary = {};
			searchFiltersStore.update({
				salary: []
			})

		}

	function onClose()
		{
			searchFiltersStore.update({
				salary: selectedSalary.getOwnKey().filter(key => selectedSalary[key])
			});
			search()
		}
</script>

<button class="btn-filter btn filter-button filter-salary" on:click={openDropdown} bind:this={filterButton}>
    {$searchQueryStore.salary.length ? `(${$searchQueryStore.salary.length})` : ''} Salary
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>


<Dropdown bind:this={dropdown} hostElm="{filterButton}" multiple={true} on:close={onClose}>
    {#if $searchFiltersStore.salary.length}
        <li on:click={onReset}>
            Clear
        </li>
    {/if}
    {#each SearchFilter.SalaryRange as value}
        <li on:click={() => setFilterValue(value)} class:active={selectedSalary[value]}>
            <span class="fe checkbox" class:fe-check={selectedSalary[value]}></span>
            <span>{value}</span>
        </li>
    {/each}
</Dropdown>

<style lang="scss">
</style>
