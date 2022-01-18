<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchQueryStore, searchFiltersStore} from '../../../stores/search-filters.store';
	import {track} from '@core/api';
	import {search} from '@stores/user-search.store';
    import Dropdown, {dropdownOpened} from '@components/shared/dropdown.svelte';
    import {onDestroy} from "svelte";

	let filterButton;
	let dropdown;
	let selectedCandidateSource: Object;

	const allVisibleSource = [SearchFilter.CandidateSource.CRM, SearchFilter.CandidateSource.VNW, SearchFilter.CandidateSource.PRIMUS]
			.map(status => status.toString());
	if ($searchQueryStore.src.length === 0 || $searchQueryStore.src.includes('-1') || $searchQueryStore.src.every(src => allVisibleSource.includes(src))) {
		selectedCandidateSource = [...allVisibleSource].toObject(true);
    } else {
			selectedCandidateSource = $searchQueryStore.src.toObject(true);
    }
	let countLabel: string;
	let isSelectAll: boolean;
    const unsub = searchQueryStore.subscribe(query => {
        isSelectAll = !$searchQueryStore.src.length || $searchQueryStore.src.length === 3;
        countLabel = isSelectAll ? 'All' : `(${$searchQueryStore.src.length})`;
    });
	$:
    {
        if (dropdown?.dropdownOpened)
        {
            isSelectAll = Object.keys(selectedCandidateSource).every(key => selectedCandidateSource[key])
                || Object.keys(selectedCandidateSource).every(key => !selectedCandidateSource[key]);
        }
    }

	const CandidateSourceOptions: { label: string, value: string | string[] }[] = [
		{
			label: 'Navigos Search',
			value: SearchFilter.CandidateSource.CRM.toString(),
		},
		{
			label: 'Vietnamworks',
			value: SearchFilter.CandidateSource.VNW.toString(),
		},
		{
			label: 'PRIMUS',
			value: SearchFilter.CandidateSource.PRIMUS.toString(),
		}
	];

    onDestroy(unsub);

	function setFilterValue(value: string)
		{
			selectedCandidateSource[value] = !selectedCandidateSource[value];

		}

		function toggleAllSource()
        {
            CandidateSourceOptions.forEach(({value}) => selectedCandidateSource[value] = true);

            // dropdown.close();
        }

	function openDropdown()
		{
			dropdown.open();
			track({event: EventName.ClickFilterCandidateSource});
		}

	function onClose()
		{
			const selectedVal = selectedCandidateSource.getOwnKey().filter(key => selectedCandidateSource[key]);
			if (
				allVisibleSource.every(status => selectedVal.includes(status))) {
				searchFiltersStore.update({
					src: [...allVisibleSource]
				});
			} else {
				searchFiltersStore.update({
					src: [...selectedVal]
				})
			}
			search();
		}
</script>

<button class=" btn list-button" class:all={isSelectAll} on:click={openDropdown} bind:this={filterButton}>
    {countLabel} Candidate source
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>


<Dropdown bind:this={dropdown} hostElm="{filterButton}" multiple={true} on:close={onClose}>
    <li on:click={toggleAllSource} class:active={isSelectAll}>
        <span class="fe checkbox" class:fe-check={isSelectAll}></span>
        <span>All Candidate source</span>
    </li>
    {#each CandidateSourceOptions as {label, value}}
        <li on:click={() => setFilterValue(value)} class:active={selectedCandidateSource[value]}>
            <span class="fe checkbox" class:fe-check={selectedCandidateSource[value]}></span>
            <span>{label}</span>
        </li>
    {/each}
</Dropdown>

<style lang="scss">
    .btn-filter.all {
      background-color: var(--color-brown);
      box-shadow: inset 0 0 0 2px var(--color-brown);
      color: #fff;
      &:hover, &:focus, &:active {
        background-color: var(--color-brown);
        outline-color: var(--color-brown);
      }
    }
</style>
