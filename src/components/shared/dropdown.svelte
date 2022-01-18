<svelte:options accessors={true}/>
<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import MenuDropdown from '@components/shared/menu-dropdown.svelte';

	const dispatch = createEventDispatcher<{
		/**
		 * emit close event with source
		 */
		close: 'backdrop' | 'esc' | undefined;
	}>();

	export let dropdownOpened: boolean = false;
	let dropdown;
	export let hostElm;
	export let multiple: boolean = false;

	$:
	{
	}

	export function open()
		{
			dropdown.open();
			dropdownOpened = true;
		}

	export function close()
		{
			dropdown.close();
			dropdownOpened = false;
            dispatch('close');
		}

	function onClose({detail})
		{
			dropdownOpened = false;
			dispatch('close', detail);
		}
</script>

<MenuDropdown
              bind:this={dropdown}
              {hostElm} on:close={onClose}>
    <ul class="filter-dropdown" class:multiple={multiple}>
        <slot/>
    </ul>
</MenuDropdown>

<style lang="scss">


  ul.filter-dropdown {
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    background-color: #f9fafb;
    margin: 5px;
    max-height: 483px;
    overflow: auto;
      padding-left: 8px;
      padding-right: 8px;

    :global(li) {
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #8f9bb3;
      display: flex;
      cursor: pointer;
      align-items: center;

      &:not(:last-child) {
        border-bottom: 1px solid #edf1f7;
      }

      &:hover, &:focus {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }

    :global(li .checkbox) {
      width: 14px;
      height: 14px;
      margin-right: 10px;
      background-color: rgb(236, 239, 243);
      border-radius: 50%;
      font-size: 10px;
      font-weight: bolder;
      border: solid 1px rgba(#8f9bb3, 0.24);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    :global(li.active) {
      color: var(--color-blue);
    }

    :global(li.active .checkbox) {
      border-color: rgba(var(--color-blue), 0.7);
    }
  }


  :global(ul.filter-dropdown.multiple li .checkbox) {
    border-radius: 3px;
  }
</style>
