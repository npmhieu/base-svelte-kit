<script lang="ts">


	// user item

	export let user;

	import {userStore} from '@stores/user-store';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function emitClickEvent(event)
    {
      dispatch('userItemClick', {
        user,
        event
      })
    }


</script>
{#if user}

  <div class:active={$userStore.selectedId === user.userId} class="result-item" on:click|preventDefault={emitClickEvent}>
    <p class="full-name">{user.fullName} <span class="view-status">View</span></p>
    <p class="job-title">{user.currentTitle}</p>
    <p class="company">Company: {user.currentCompanyName}</p>
    <p class="salary">Current salary: {user.currentSalary}</p>

    <span class="last-activity">
      <i class="fe fe-rotate-ccw mr-1"></i> <span>{user.lastUpdated}</span>
    </span>

  </div>

{/if}

<style lang="scss">
    /*.company, .job-title{*/
    /*    overflow: hidden;*/
    /*    display: -webkit-inline-box;*/
    /*    -webkit-line-clamp: 2;*/
    /*    -webkit-box-orient: vertical;*/
    /*}*/
  .last-activity i{
    font-size: 14px;
    vertical-align: bottom;
  }
  .last-activity{
    position: absolute;
    right: 24px;
    bottom: 18px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    color: #aaaaae;
  }
</style>
