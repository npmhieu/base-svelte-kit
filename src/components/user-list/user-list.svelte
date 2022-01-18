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
	let listHeight = users.length < 5 ? (userItemHeight * (users.length)) : (innerHeight - 242);
	const userItemHeight = 118;
	const distanceBeforeFetch = userItemHeight * 10;

	// $:
	// {
	//     if(users.length < 5 ){
    //         listHeight = userItemHeight * (users.length) || 1;
    //     } else {
    //         listHeight = innerHeight - 242;
    //     }
	// }

	function infiniteHandler({detail: {loaded, complete, error}})
		{
			dispatch('scrollDownThresholdReached', {loaded, complete, error});
		}

		function onUserClick(user)
          {
	          dispatch('userClick', user);
          }

	// user item


</script>
<svelte:window
        bind:innerHeight
/>

<section class="user-list-wrapper">
<!--    <div class="list-top&#45;&#45;bar flex items-center">-->
<!--        <div class="flex justify-between items-center">-->
<!--            <div class="user-count">{totalUserCount} candidate{totalUserCount > 1 ? 's' : ''}</div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="list-body">
        <VirtualList
                width="100%"
                height={listHeight}
                itemCount={users.length}
                itemSize={userItemHeight}>
            <div slot="item" let:index let:style {style} class="px-2" on:click={() => onUserClick(users[index])}>
                <UserItem user={users[index]} on:userItemClick />
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
    display: flex;
    flex-direction: column;
  }

  .list-body {
    flex: 1 0 auto;
    padding-top: 0px;

    :global(.virtual-list-inner) {
      padding-right: 14px;
    }
  }

  .list-top--bar {
    position: relative;
    overflow: visible;
    min-height: 44px;
    align-items: center;
    background: #fff;
    padding: 6px 6px 6px 28px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    margin: 0 12px;
    flex: 0 1 auto;

    &.hint {
      min-height: 86px;
    }

    button.mat-button {
      height: 32px;
      line-height: 32px;
    }

    .user-count {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-brown);
      position: relative;
    }

    &:after {
      content: "";
      position: absolute;
      background: linear-gradient(
                      180deg, #f8f9fc 0%, rgba(248, 249, 252, 0.8) 60%, rgba(248, 249, 252, 0) 100%);
      bottom: -16px;
      z-index: 1;
      left: -4px;
      width: 100%;
      height: 12px;
    }
  }
</style>
