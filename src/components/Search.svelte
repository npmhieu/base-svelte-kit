<script>
    import SearchFilter from '@components/search/SearchFilter.svelte';
    import SearchResult from '@components/search/SearchResult.svelte';
</script>

<div class="search-page">
    <SearchFilter/>
    <SearchResult/>
</div>

<style lang="scss">
    @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
    @import '@styles/search.css';
</style>
