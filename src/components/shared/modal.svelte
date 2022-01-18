<script lang="ts">
	import {clickOutside} from '@core/directives';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher<{
		/**
		 * emit close event with source
		 */
		close: ModalCloseSource;
	}>();

	export let closeIcon: boolean = true;

	export let modalOpened = false;

	export function close(source?: ModalCloseSource)
		{
			modalOpened = false;
			dispatch('close', source);
		}

	export function open()
		{
			modalOpened = true;
		}

	function onCloseButtonClicked()
		{
			close('button');
		}

	function onBackdropClicked()
		{
			close('backdrop');
		}
</script>

<svelte:window
        on:keydown={e => {
    if (e.keyCode === 27) {
      close('esc');
    }
  }}/>

{#if modalOpened}
    <div class="pm-overlay darken">
        <div class="modal-wrapper" use:clickOutside on:click_outside={() => onBackdropClicked()}>
            {#if closeIcon}
                <button class="close" on:click={() => onCloseButtonClicked()}>&times;</button>
            {/if}
            {#if $$slots.header}
                <slot name="header"/>
            {/if}
            <div class="content">
                <slot name="content"/>
            </div>
            {#if $$slots.footer}
                <slot name="footer"/>
            {/if}
            <slot/>
        </div>
    </div>
{/if}

<style lang="scss">
  .modal-wrapper {
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    position: relative;
    padding: 10px 20px;
    display: flex;
    flex-flow: column;
    background-color: #fff;

    :global(.title) {
      font-weight: bold;
      font-size: var(--modal-header-text-size);
    }

    :global(*[slot="header"]) {
      padding: 10px;
    }

    .close {
      display: block;
      box-sizing: border-box;
      position: absolute;
      z-index: 1000;
      top: 1rem;
      right: 1rem;
      margin: 0;
      padding: 0;
      width: 20px;
      height: 20px;
      border: 0;
      color: #292d32;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 0 1.5px #292d32;
      transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
      -webkit-appearance: none;
      &:before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        width: 12px;
        height: 1.5px;
        background: #292d32;
        transform-origin: center;
        transition: height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        -webkit-transform: translate(0, -50%) rotate(45deg);
        -moz-transform: translate(0, -50%) rotate(45deg);
        transform: translate(0, -50%) rotate(45deg);
        left: 0.25rem;
      }
      &:after {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        width: 12px;
        height: 1.5px;
        background: #292d32;
        transform-origin: center;
        transition: height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        -webkit-transform: translate(0, -50%) rotate(-45deg);
        -moz-transform: translate(0, -50%) rotate(-45deg);
        transform: translate(0, -50%) rotate(-45deg);
        left: 0.25rem;
      }
      &:hover {
        background: #292d32;
        outline: none;
        &:before {
          height: 2px;
          background: white;
        }
        &:after {
          height: 2px;
          background: white;
        }
      }
      &:focus {
        border-color: #292d32;
        box-shadow: 0 0 0 2px #3399ff;
        outline: none;
      }
      &:active {
        transform: scale(0.9);
        outline: none;
      }
    }


    .content {
      width: 100%;
      height: 100%;
      max-height: 70vh;
      overflow: auto;
    }

    :global(*[slot="footer"]) {
      padding-top: 16px;
      padding-bottom: 10px;

      :global(button) {
        align-items: center;
        padding: 0 10px;
      }
    }
  }
</style>
