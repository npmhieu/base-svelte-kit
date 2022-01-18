<script>

    // IMPORT
    import {onMount} from 'svelte';

    import {userSearchStore, search, searchMore} from '@stores/user-search.store';
    import {userStore, currentUser, loadUserDetail, loadUserTab} from '@stores/user-store';

    import UserList from '@components/user-list/user-list.svelte';


    // VARIABLES
    $: users = $userSearchStore.userIds.map(id => $userStore.users[id]);

    let highlightedUserIds = [];

    // METHODS

    onMount(async () => {
        await search();
    });

    function checkIfOpenInNewTab({detail})
    {
        if (detail.event.ctrlKey || detail.event.metaKey) {
            window.open(`candidate-detail/${detail.user.userId}`, '_blank');
        }
    }

    function onUserClicked({detail}) {

        $userStore.selectedId = detail.userId;
        loadUserDetail();
        loadUserTab();
    }

    async function onScrollThresholdReached({detail: {loaded, complete, error}}) {

        if ($userSearchStore.currentPage !== null && $userSearchStore.totalPage <= $userSearchStore.currentPage) {
            complete();
        } else {
            await searchMore();
            loaded();
        }
    }

</script>

<div class="result-list">

    {#if $userSearchStore.currentPage !== null}
        <UserList {users} totalUserCount={$userSearchStore.totalUserCount}
                  {highlightedUserIds}
                  on:userItemClick={checkIfOpenInNewTab}
                  on:userClick={onUserClicked}
                  on:scrollDownThresholdReached={onScrollThresholdReached}/>
    {/if}

</div>

<style>

</style>
