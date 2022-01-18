<script>

    import {selectedUser} from '@stores/user-store';

    import SearchResultMeta from '@components/search/SearchResultMeta.svelte';
    import SearchResultList from '@components/search/SearchResultList.svelte';
    import UserDetail from '@components/search/UserDetail.svelte';


</script>

<section id="searchResult" class="search-result">
    <div class="row">
        <div class="col-4">
            <!-- Result list here -->
            <SearchResultMeta/>
            <SearchResultList/>

        </div>

        <div class="col-8">
            <!-- user detail here -->
            {#if $selectedUser}
                <UserDetail/>
            {:else}
                <section class="no-user-selected">
                    <div class="select-user-text flex items-center justify-center">
                        <span class="mt-auto">
                            Select a Candidate to view
                        </span>
                    </div>
                </section>
            {/if}
        </div>
    </div>
</section>

<style>

</style>
