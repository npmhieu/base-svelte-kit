<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchFiltersStore} from '../../../stores/search-filters.store';
    import {search} from '@stores/user-search.store';
	import {track} from '../../../core/api';
	import Modal from '@components/shared/modal.svelte';

	let modal;

	let selectedValue: any[] = [...$searchFiltersStore['job-function']];
	let selectedFunctionMap: { [id: string]: boolean } = {};

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
			selectedValue = [];
			selectedFunctionMap = {};
			searchFiltersStore.update({
				'job-function': []
			});
            search();
		}

	function onCheckboxValueChange(jobFunctionId: string)
		{
			selectedValue.toggle(jobFunctionId);
			selectedFunctionMap[jobFunctionId] = !selectedFunctionMap[jobFunctionId];
		}

	function onModalClose({detail})
		{
			if (['apply', 'backdrop'].includes(detail)) {
				searchFiltersStore.update({
					'job-function': selectedValue
				});
				search();
			}
		}

	function onCancel()
		{
			modal.close();
			selectedValue = [...$searchFiltersStore['job-function']];
			selectedFunctionMap = selectedValue.reduce((acc, cur) => ({...acc, [cur]: true}), {});
		}

</script>

<button class="btn-filter btn filter-button" on:click={openDialog}>
    {$searchFiltersStore['job-function'].length ? `(${$searchFiltersStore['job-function'].length})` : ''} Function
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>

<Modal bind:this={modal} on:close={onModalClose}>
    <div slot="header">
        <h2 class="title">Job function</h2>
    </div>
    <div slot="content">
        {#each SearchFilter.JobFunctions as {id, name}}
            <label for="function_{id}">
                <input type="checkbox"
                       on:change={(event) => onCheckboxValueChange(id.toString())}
                       id="function_{id}" bind:checked="{selectedFunctionMap[id]}"/>
                {name}
            </label>
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
    width: 50%;
    align-items: center;
    cursor: pointer;
    transition: .2s background-color ease-in-out;

    &:hover, &:focus, &:active {
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.05);
    }

    input {
      margin-right: 8px;
    }
  }
</style>
