<script lang="ts">
	import {EventName, SearchFilter} from '@core/constants';
	import {searchFiltersStore} from '@stores/search-filters.store';
	import {search} from '@stores/user-search.store';
	import {track} from '@core/api';
	import Modal from '@components/shared/modal.svelte';

	let modal;

	let selectedIndustry: any[] = [...$searchFiltersStore['job-industry']];
	let selectedIndustryMap: { [id: string]: boolean } = {};

    let industryCount: number;

    function countSelectedIndustryLevel2(): void
    {
        let selectedIndustryCount = 0;
        SearchFilter.JobIndustries.forEach(group => {
            for (const groupLevel2 of group.industries) {
                if (groupLevel2.ids.some(id => selectedIndustry.includes(id))) {
                    selectedIndustryCount++;
                }
            }
        })
        industryCount = selectedIndustryCount;
    }

	function openDialog()
		{
			modal.open();
			void track({event: EventName.ClickFilterFunction});
		}

	function onReset()
		{
			modal.close();
			selectedIndustry = [];
			selectedIndustryMap = {};
			searchFiltersStore.update({
				'job-industry': []
			});
            countSelectedIndustryLevel2();
			search();
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

	function toggle(code, industries, name, ids)
		{
			const checked = !ids.some(id => !selectedIndustry.includes(id));

			selectedIndustry = !checked
				? [...selectedIndustry, ...ids]
				: selectedIndustry.filter(existedId => ids.indexOf(existedId) === -1);
			selectedIndustryMap[name] = !checked;
			selectedIndustryMap[code] = hasSelectedAll(industries);
		}

	function onModalClose({detail})
		{
			if (['apply', 'backdrop'].includes(detail)) {
				searchFiltersStore.update({
					'job-industry': selectedIndustry
				});
                countSelectedIndustryLevel2();
				search();
			}
		}

	function onCancel()
		{
			modal.close();
			selectedIndustry = [...$searchFiltersStore['job-industry']];
			selectedIndustryMap = selectedIndustry.reduce((acc, cur) => ({...acc, [cur]: true}), {});
            countSelectedIndustryLevel2();
		}

</script>

<button class="btn-filter btn filter-button" on:click={openDialog}>
    {industryCount ? `(${industryCount})` : ''} Industry
    <span class="ml-1 font-bold fe fe-chevron-down"></span>
</button>

<Modal bind:this={modal} on:close={onModalClose}>
    <div slot="header">
        <h2 class="title">Job industry</h2>
    </div>
    <div slot="content">
        {#each SearchFilter.JobIndustries as {code, industries, name}}
            <label for="industry_{code}" class="w-full font-bold my-5">
                <input type="checkbox" on:change={(event) => onIndustryGroupCheck(code, industries)}
                       id="industry_{code}" bind:checked="{selectedIndustryMap[code]}"/>
                {name}
            </label>
            <div class="ml-4">
                {#each industries as {name, ids}}
                    <label for="industry_{name}" class="w-1/2">
                        <input type="checkbox"
                               on:change={(event) => toggle(code, industries, name, ids)}
                               id="industry_{name}" bind:checked="{selectedIndustryMap[name]}"/>
                        {name}
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
