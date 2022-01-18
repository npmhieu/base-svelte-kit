<script>

    import {userSearchStore} from '@stores/user-search.store';
    $: totalItems = $userSearchStore.totalUserCount ? $userSearchStore.totalUserCount.toLocaleString() : 0;


</script>

<div class="search-meta">
    <div class="search-number flex-space-between">
        <span>{totalItems} Profiles</span>
        <div class="dropdown">
            <button class="btn recently-update-button dropdown-toggle" type="button" id="dropdownSort"
                    data-bs-toggle="dropdown" aria-expanded="false">
                Recently updated
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownSort">
                <li><a class="dropdown-item" href="#">Most matching</a></li>
                <li><a class="dropdown-item" href="#">Recently updated</a></li>

            </ul>
        </div>


    </div>
    <p class="click-legend"><span>Ctrl + click</span> to open in new tab</p>
</div>

<style>

</style>
