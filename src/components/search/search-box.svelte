<script lang="ts">

	import {searchFiltersStore, DefaultSearchString, searchQueryStore} from '@stores/search-filters.store';
	import {onDestroy} from 'svelte';

	let searchInput;

	let showResetBtn = false;
	let inputValue = $searchFiltersStore.stringFind;

	const unsubscribe = searchQueryStore.subscribe(async (searchQueries) =>
	{
		showResetBtn = JSON.stringify(searchQueries) !== DefaultSearchString;
	});

	function onSearchBtnClick()
		{
			searchFiltersStore.updateSearchKeyword(inputValue)
		}

	function onKeyPress(key)
		{
			if (key.charCode === 13) {
				searchFiltersStore.updateSearchKeyword(inputValue)
			}
		}

	function clearSearchKeyword()
		{
			searchFiltersStore.updateSearchKeyword('');
			inputValue = '';
		}

	onDestroy(unsubscribe);

</script>

<section>
    <div class="search-input">
        <input placeholder="Or type your keywords here. You can use AND, OR, “ “…."
               bind:this={searchInput}
               bind:value={inputValue}
               on:keypress={onKeyPress}
        />
        {#if inputValue}
            <button class="btn-icon fe fe-x" on:click={clearSearchKeyword}>
            </button>
        {/if}
    </div>

    <button class="btn-search" on:click={onSearchBtnClick}>
        Search
    </button>

    {#if showResetBtn}
        <button class="btn round accent ml-auto mr-0" on:click={searchFiltersStore.reset}>
            <i class="fe fe-refresh-cw mr-3"></i>
            Reset filters
        </button>
    {/if}
</section>

<style lang="scss">
  section {
    flex: 1 0 auto;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .search-input {
      display: inline-flex;
      align-items: center;
      border-radius: 7px;
      height: 40px;
      position: relative;
      background-color: #f3f4f6;
      flex: 1 0 auto;
      max-width: 606px;
      width: 100%;
      padding: 0;


      input {
        height: 46px;
        min-height: 46px;
        max-height: 46px;
        padding: 0 0 0 16px;
        border: none;
        outline: none;
        background: transparent !important;
        font-size: 14px;
        font-weight: 500;
        flex: 1 1 0;
        color: #808080;
      }

      > button {
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        border-radius: 8px;
        padding: 10px;

        &.save-search {
          color: var(--color-brown);
        }

        &.clear-search {
          color: rgba(0, 0, 0, .87);
        }

        &:focus, &:active, &:hover {
          background-color: rgba(var(--color-brown-rgb), .04);
        }
      }
    }

    .btn-search {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
      color: #fff;
      background-color: var(--color-blue);
      text-transform: uppercase;
      width: 120px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 7px;
      box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
    }
  }
</style>
