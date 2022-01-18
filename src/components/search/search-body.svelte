

<script lang="ts">
	import UserList from '@components/user-list/user-list.svelte';
	import UserDetails from '../user-details/UserDetail.svelte';
	import {userStore} from '@stores/user-store';
	import {userSearchStore} from '@stores/user-search.store';
	import {onDestroy} from 'svelte';
	import {searchQueryStore} from '@stores/search-filters.store';
	import {v4 as uuidv4} from 'uuid';
	// import moment from 'moment/moment';
	import moment from 'moment';
	import {SearchFilter} from '@core/constants';
	import * as faker from 'faker';
	// import * as faker from 'faker/locale/en';
	import {api} from '@core/api';


	let users = [];
	let highlightedUserIds = [];



	function onUserClicked({detail})
		{
			$userStore.selectedId = detail.userId;
		}

	const unsubscribe = searchQueryStore.subscribe(async (searchQueries) =>
	{
		await api.post('crm', '/nss/search', {
			...$searchQueryStore,
			page: 1
		}).then(({data}) =>
		{
			// if (data) {
			// 	data.items.forEach(user => $userStore.users[user.userId] = user);
			// 	$userSearchStore = {
			// 		totalUserCount: data.pagination.totalItems,
			// 		searchSessionId: uuidv4(),
			// 		currentPage: 1,
			// 		totalPage: data.pagination.totalPages,
			// 		userIds: data.items.map(user => user.userId)
			// 	};
			// 	users = $userSearchStore.userIds.map(id => $userStore.users[id]);
			// }
		});
	});

	async function onScrollThresholdReached({detail: {loaded, complete, error}})
		{
			if ($userSearchStore.currentPage !== null && $userSearchStore.totalPage === $userSearchStore.currentPage) {
				complete();
			} else {
				$userSearchStore.currentPage = $userSearchStore.currentPage + 1;
				await api.post('crm', '/nss/search', {
					...$searchQueryStore,
					page: $userSearchStore.currentPage
				}).then(({data}) =>
					{
						if (data) {
							data.items.forEach(user => $userStore.users[user.userId] = {
								...user,
								lastUpdated: moment(user.updatedOn, 'dd-MM-yyyy hh:mm').fromNow()
							});

							$userSearchStore = {
								...$userSearchStore,
								totalUserCount: data.pagination.totalItems,
								currentPage: data.pagination.currentPage,
								totalPage: data.pagination.totalPages,
								userIds: [...$userSearchStore.userIds, ...data.items.map(user => user.userId)]
							};
							users = $userSearchStore.userIds.map(id => $userStore.users[id]);
							loaded();
						}
					}
				);
			}
		}

	onDestroy(unsubscribe);
</script>

<section>

    <i class="isax isax-activity"></i>
    <div class="content mx-auto">
        <div>
            {#if $userSearchStore.currentPage !== null}
                <UserList {users} totalUserCount={$userSearchStore.totalUserCount}
                          {highlightedUserIds}
                          on:userClick={onUserClicked}
                          on:scrollDownThresholdReached={onScrollThresholdReached}/>
            {/if}
        </div>
        <div class="profile-details">
            <UserDetails/>
        </div>
    </div>
</section>
<style lang="scss">
  section {
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
    height: calc(100vh - var(--header-hight) - 100px);

    .content {
      display: grid;
      height: 100%;
      grid-template-columns: 420px 860px;
      width: 100%;
      max-width: var(--container-width);
    }

    :global(.user-list-wrapper) {

    }
    .profile-details {
      display: flex;
      flex: 1 1 0;
      overflow: auto;

    }
  }
</style>
