<style lang="scss">
  section {
    display: flex;
    flex-flow: column;
    justify-content: center;
    min-height: 100px;
    max-height: 100px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    margin-bottom: 4px;
    background-color: #fff;
    width: 100%;

    .search-header-container {
      display: flex;
      align-items: center;
      flex-flow: column;
      justify-content: flex-start;
      max-width: var(--container-width);
      width: 100%;
      margin: 0 auto;
      padding: 0 var(--container-padding-x);
    }

    .search-box {
      margin-bottom: 10px;
    }
  }
</style>

<script lang="ts">
	import SearchBox from './search-box.svelte';
	import FilterBar from './filters-bar.svelte';
</script>

<section>
    <div class="search-header-container">
        <SearchBox/>
        <FilterBar/>
    </div>
</section>
