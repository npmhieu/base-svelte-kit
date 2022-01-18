<script lang="ts">
	import {EventName, Industry, IndustryGroup, SearchFilter} from '@core/constants';
	import {searchFiltersStore} from '../../../stores/search-filters.store';
	import {track} from '../../../core/api';
	import Modal from '@components/shared/modal.svelte';

	let modal;

	let modalOpened = false;

	let selectedIndustry: any[] = [...$searchFiltersStore['job-function']];
	let selectedIndustryMap: { [id: string]: boolean } = {};

	$: {

	}

	function openDialog()
		{
			modal.show();
			void track({event: EventName.ClickFilterFunction});
		}

	function onReset()
		{
			modal.hide();
			selectedIndustry = [];
			searchFiltersStore.update({
				'job-function': []
			})
		}

	function closeDialog()
		{
			modalOpened = false;
		}

	function onIndustryGroupCheck(code, industries: Industry[])
		{
			const idInGroup = [].concat.apply([], industries.map(ind => ind.ids));
			if (hasSelectedAll(industries)) {
				selectedIndustry = selectedIndustry.filter(id => idInGroup.indexOf(id) === -1);

				selectedIndustryMap = {
					...industries.reduce((acc, cur) =>
					{
						return {
							...acc,
							[cur.name]: false
						}
					}, {...selectedIndustryMap}),
					[code]: false
				}


			} else {
				selectedIndustry = selectedIndustry.distinctElm(idInGroup);

				selectedIndustryMap = {
					...industries.reduce((acc, cur) =>
					{
						return {
							...acc,
							[cur.name]: true
						}
					}, {...selectedIndustryMap}),
					[code]: true
				}
			}
		}

	function hasSelectedAll(industries: Industry[]): boolean
		{
			return [].concat.apply([], industries.map(ind => ind.ids)).every(id => selectedIndustry.indexOf(id) !== -1);
		}

	function isGroupChecked(industries: Industry[]): boolean
		{
			const idInGroup = [].concat.apply([], industries.map(ind => ind.ids));
			const selectedCount = selectedIndustry.filter(selectedId => idInGroup.indexOf(selectedId) !== -1).length;
			return selectedCount > 0;
		}

	function hasSelectedIndustry(name, ids: string[]): boolean
		{
			return ids.every(id => selectedIndustry.indexOf(id) !== -1);
		}

	function toggle(code, industries, name, ids)
		{
			const checked = !ids.some(id => !selectedIndustry.includes(id));
			selectedIndustry = !checked
				? [...selectedIndustry, ...ids]
				: selectedIndustry.filter(existedId => ids.indexOf(existedId) === -1);
			selectedIndustryMap[name] = !checked;
			selectedIndustryMap[code] = hasSelectedAll(industries);
		}

	function onModalClose(source)
		{
			searchFiltersStore.update({
				'job-industry': selectedIndustry
			});
		}

	function onCancel()
		{
			modal.hide();
			selectedIndustry = [...$searchFiltersStore['job-industry']];
		}

</script>

<div class="mx-2">
    <Modal bind:this={modal} on:close={onModalClose}>
        <div class="header">
            <h2 class="title">Job industry</h2>
        </div>
        <div class="content">
            {#each SearchFilter.JobIndustries as {code, industries, name}}
                <label for="industry_{code}">
                    <input type="checkbox" on:change={(event) => onIndustryGroupCheck(code, industries)}
                           id="industry_{code}" bind:checked="{selectedIndustryMap[code]}"/>
                    {name}
                </label>
                <div class="ml-4">
                    {#each industries as {name, ids}}
                        <label for="industry_{name}">
                            <input type="checkbox"
                                   on:change={(event) => toggle(code, industries, name, ids)}
                                   id="industry_{name}" bind:checked="{selectedIndustryMap[name]}"/>
                            {name}
                        </label>
                    {/each}
                </div>
            {/each}
        </div>

        <div class="footer">
            <button on:click={onReset}>
                Reset
            </button>
            <button on:click={onCancel}>
                Cancel
            </button>
            <button class="" on:click={onModalClose}>
                Apply
            </button>
        </div>
    </Modal>

</div>

<style lang="scss">
  @import "src/styles/filter-dropdown";

  .header {
    padding: 10px;
  }

  .title {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .content {
    width: 700px;
    height: 100%;
    max-height: 70vh;
    overflow: auto;

    label {
      display: inline-flex;
      width: 50%;
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
  }
</style>
