<script lang="ts">
	import {EventName} from '@core/constants';
	import {searchQueryStore, searchFiltersStore} from '@stores/search-filters.store';
	import {track} from '@core/api';
	import MenuDropdown from '@components/shared/menu-dropdown.svelte';

	let filterButton;
	let dropdown;
	const currentYear = new Date().getFullYear();
	let selectedYear = [null, null];
	selectedYear[0] = $searchQueryStore.age[1] ? (currentYear - $searchQueryStore.age[1]) : null;
	selectedYear[1] = $searchQueryStore.age[0] ? (currentYear - $searchQueryStore.age[0]) : null;
	let selectedStatusLabel;
	$:
	{
		selectedStatusLabel = $searchQueryStore.age.filter(age => age !== null).length ? '*' : '';
	}

	function openDropdown()
		{
			dropdown.open();
			track({event: EventName.ClickFilterYearOfBirth});
		}

	function onReset()
		{
			dropdown.close();
			selectedYear = [];
			searchFiltersStore.update({
				age: [null, null]
			})

		}

	function onClose()
		{
			dropdown.close();
			const currentYear = new Date().getFullYear();
			const [fromYear, toYear] = selectedYear;
			const fromAge = (toYear >= currentYear || toYear <= 0) ? null : currentYear - toYear;
			const toAge = (fromYear >= currentYear || fromYear <= 0) ? null : currentYear - fromYear;
			const convertedAge = fromAge && toAge
				? [fromAge, toAge]
				: (!fromAge && !toAge) ? [null, null]
					: (!fromAge && toAge) ? [null, toAge] : [fromAge, null];

			if ($searchQueryStore.age[0] === convertedAge[0] && $searchQueryStore.age[1] === convertedAge[1]) {
				return;
			}
			searchFiltersStore.update({
				age: convertedAge
			})
		}
</script>

<button class="btn-filter btn filter-button filter-age" on:click={openDropdown} bind:this={filterButton}>
    {selectedStatusLabel} Year of Birth
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>


<MenuDropdown
        bind:this={dropdown}
        hostElm={filterButton} on:close={onClose}>
    <div class="form-group p-4">
        <div class="input-group flex mb-5">
            <div class="w-1/2 mr-1 rounded-md p-2">
                <label for="fromYear" class="block font-medium mb-2">
                    From year
                </label>
                <input id="fromYear" bind:value={selectedYear[0]}/>
            </div>
            <div class="w-1/2 ml-1 rounded-md p-2">
                <label for="toYear" class="block font-medium mb-2">
                    To year
                </label>
                <input id="toYear" bind:value={selectedYear[1]}/>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <button class="btn rounder" on:click={onReset}>
                Clear
            </button>
            <button class="btn flat accent rounder" on:click={onClose}>
                Apply
            </button>
        </div>
    </div>
</MenuDropdown>

<style lang="scss">
  .form-group {
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    background-color: #f9fafb;
    margin: 5px;
    max-height: 483px;
    overflow: auto;
  }


  .input-group {
    > div {
      background-color: #efefef;
    }
  }

  input {
    background-color: transparent;
    outline: none;
  }
</style>
