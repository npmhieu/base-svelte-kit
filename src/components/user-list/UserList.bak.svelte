<script lang="ts">

	import VirtualList from 'svelte-tiny-virtual-list';
	import InfiniteLoading from 'svelte-infinite-loading';
	import UserItem from './user-item.svelte';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher<{
		scrollDownThresholdReached: { loaded: () => any, complete: () => any, error: () => any },
		userClick: string
	}>();

	export let users = [];
	export let totalUserCount = 0;


	let innerHeight = window.innerHeight;
	let listHeight;
	const userItemHeight = 132;
	const distanceBeforeFetch = userItemHeight * 10;

	$:
	{
		listHeight = innerHeight - 240;
	}

	function infiniteHandler({detail: {loaded, complete, error}})
		{
			dispatch('scrollDownThresholdReached', {loaded, complete, error});
		}

	function onUserClick(user)
		{
			dispatch('userClick', user);
		}


</script>
<svelte:window
        bind:innerHeight
/>

<section class="user-list-wrapper">
    <div class="list-body">
        <VirtualList
                width="100%"
                height={listHeight}
                itemCount={users.length}
                itemSize={userItemHeight}>
            <div slot="item" let:index let:style {style} class="mb-4 pr-4" on:click={() => onUserClick(users[index])}>
                <UserItem user={users[index]} on:userItemClick/>
            </div>

            <div slot="footer">
                <InfiniteLoading distance={distanceBeforeFetch} on:infinite={infiniteHandler}/>
            </div>
            <div slot="noMore"></div>
        </VirtualList>
    </div>
</section>

<style lang="scss">
  section {

    flex: 1 0 auto;
    padding-top: 12px;

    :global(.virtual-list-inner) {
      padding-right: 14px;
    }
  }
</style>
