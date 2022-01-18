<svelte:options accessors={true}/>
<script lang="ts">
	import {clickOutside} from '@core/directives';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher<{
		/**
		 * emit close event with source
		 */
		close: 'backdrop' | 'esc' | undefined;
	}>();

	export let dropdownOpened: boolean = false;
	export let hostElm;
	export let multiple: boolean = false;
	let menuPosX, menuPosY;

	$:
	{
		if (hostElm) {
			let {left, top, height} = hostElm.getClientRects()[0];
			menuPosX = left;
			menuPosY = top + height + 4;
		}
	}

	export function open()
		{
			dropdownOpened = true;
		}

	export function close()
		{
			dropdownOpened = false;
		}

	function onBackdropClicked()
		{
			dropdownOpened = false;
			dispatch('close', 'backdrop');
		}
</script>

<svelte:window
        on:keydown={e => {
    if (e.keyCode === 27) {
      dropdownOpened = false;
      dispatch('close', 'esc');
    }
  }}/>

{#if dropdownOpened}
    <div class="pm-overlay">
        <div class="dropdown-wrapper" style="left: {menuPosX}px; top: {menuPosY}px" use:clickOutside
             on:click_outside={onBackdropClicked}>
            <slot/>
        </div>
    </div>
{/if}

<style lang="scss">
  .dropdown-wrapper {
    position: absolute;
    overflow: auto;
  }
</style>
