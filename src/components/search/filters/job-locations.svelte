<script lang="ts">
	import {EventName, location, locationGroup, LocationDetail, SearchFilter} from '@core/constants';
	import {searchFiltersStore} from '../../../stores/search-filters.store';
	import {search} from '@stores/user-search.store';
	import {track} from '../../../core/api';
	import Modal from '@components/shared/modal.svelte';

	let modal;

	let selectedLocation: any[] = [...$searchFiltersStore.location];
	let selectedLocationMap: { [id: string]: boolean } = {};

	$: {

	}

	function openDialog()
		{
			modal.open();
			void track({event: EventName.ClickFilterFunction});
		}

	function onReset()
		{
			modal.close();
			selectedLocation = [];
			selectedLocationMap = {};
			searchFiltersStore.update({
				location: []
			})
		}

	function onLocationGroupCheck(code, locations: LocationDetail[])
		{
			const idInGroup = locations.map(loc => loc.id);
			if (hasSelectedAll(locations)) {
				selectedLocation = selectedLocation.filter(id => idInGroup.indexOf(id) === -1);

				selectedLocationMap = {
					...locations.reduce((acc, cur) =>
					{
						return {
							...acc,
							[cur.id]: false
						}
					}, {...selectedLocationMap}),
					[code]: false
				}


			} else {
				selectedLocation = selectedLocation.distinctElm(idInGroup);

				selectedLocationMap = {
					...locations.reduce((acc, cur) =>
					{
						return {
							...acc,
							[cur.id]: true
						}
					}, {...selectedLocationMap}),
					[code]: true
				}
			}
		}

	function hasSelectedAll(locations: LocationDetail[]): boolean
		{
			return locations.map(loc => loc.id).every(id => selectedLocation.indexOf(id) !== -1);
		}

	function toggle(groupId, locationId)
		{
			selectedLocation.toggle(locationId);
			selectedLocationMap[locationId] = selectedLocation.includes(locationId);
			selectedLocationMap[groupId] = hasSelectedAll(SearchFilter.Locations.find(group => group).locations);
		}

	function onModalClose({detail})
		{

			if (['apply', 'backdrop'].includes(detail)) {
				searchFiltersStore.update({
					'location': selectedLocation
				});
				search();
			}
		}

	function onCancel()
		{
			modal.close();
			selectedLocation = [...$searchFiltersStore.location];
			selectedLocationMap = selectedLocation.reduce((acc, cur) => ({...acc, [cur]: true}), {});
		}

</script>

    <button class="btn-filter btn filter-button" on:click={openDialog}>
        {$searchFiltersStore.location.length ? `(${$searchFiltersStore.location.length})` : ''} Location
        <span class="ml-1 font-bold fe fe-chevron-down"></span>
    </button>

    <Modal bind:this={modal} on:close={onModalClose}>
        <div slot="header">
            <h2 class="title">Job location</h2>
        </div>
        <div slot="content">
            {#each SearchFilter.Locations as {id, name, locations}}
                <label for="location_{id}" class="w-full font-bold my-5">
                    <input type="checkbox" on:change={(event) => onLocationGroupCheck(id, locations)}
                           id="location_{id}" bind:checked="{selectedLocationMap[id]}"/>
                    {name}
                </label>
                <div class="ml-4">
                    {#each locations as location}
                        <label for="location_{location.id}" class="w-1/2">
                            <input type="checkbox"
                                   on:change={(event) => toggle(id, location.id)}
                                   id="location_{location.id}" bind:checked="{selectedLocationMap[location.id]}"/>
                            {location.name}
                        </label>
                    {/each}
                </div>
            {/each}
        </div>

        <div slot="footer" class="flex">
            <button class="btn flat rounder stroke ml-auto" on:click={onReset}>
                Reset
            </button>
            <button class="btn flat rounder mx-4" on:click={onCancel}>
                Cancel
            </button>
            <button class="btn flat rounder accent" on:click={() => modal.close('apply')}>
                Apply
            </button>
        </div>
    </Modal>

<style lang="scss">

  :global(.content) {
    max-width: 700px;
  }


  label {
    display: inline-flex;
    padding: 15px;
    align-items: center;
    cursor: pointer;
    transition: .2s background-color ease-in-out;

    &:hover, &:focus, &:active {
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  input {
    margin-right: 8px;
  }
</style>
