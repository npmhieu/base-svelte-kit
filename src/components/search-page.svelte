<script lang="ts">
    import SearchHeader from '@components/search/search-header.svelte';
    import SearchBody from '@components/search/search-body.svelte';
</script>

<div>
    <SearchHeader/>
    <SearchBody/>
</div>
<style lang="scss">
  div {
    background-color: #f7f9fc;
    height: calc(100vh - var(--header-hight));
    display: flex;
    flex-flow: column;
  }
  .search-page--body {
    width: 100%;
    max-width: var(--container-width);
    min-width: 800px;
    padding: 0 var(--container-padding-x);
    margin: 0 auto;
    display: grid;
    grid-gap: 10px;
  }
</style>
