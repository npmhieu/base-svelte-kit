<script>
    import {getContext} from 'svelte';

    export let message = '';
    export let title = '';
    export let hasForm = false;
    export let cancelText = 'Cancel';
    export let confirmText = 'Confirm';
    export let onCanceled = () => {
    };
    export let onConfirmed = () => {
    };

    const {close} = getContext('crm-modal');

    let value;
    let onChange = (val) => {
    };

    function _onCancel() {
        onCanceled();
        close();
    }

    function _onOkay() {
        onConfirmed(value);
        close();
    }

    // $: onChange(value)
</script>

{#if title}
    <h2 class="mb-5">{@html title}</h2>
{/if}
<p class="mb-10 text-center">{@html message}</p>

{#if hasForm}
    <input
            type="text"
            bind:value
            on:keydown={e => e.which === 13 && _onOkay()}/>
{/if}

<div class="buttons">
    <button class="btn-cancel" on:click={_onCancel}>
        {cancelText}
    </button>
    <button class="btn-confirm" on:click={_onOkay}>
        {confirmText}
    </button>
</div>


<style lang="scss">
  h2 {
    font-size: 22px;
    text-align: center;
    color: var(--color-blue);
    font-weight: bold;
  }

  .btn-cancel {
    width: 94px;
    height: 40px;
    padding: 11px 23px;
    border-radius: 4px;
    border: solid 1px #aaaaae;

    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: var(--color-text-default);
  }

  .btn-confirm {
    width: 101px;
    height: 40px;
    padding: 12px 24px 12px 25px;
    border-radius: 4px;
    background-color: var(--color-blue);

    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: -0.22px;
    text-align: center;
    color: #fff;
  }

  p {
    color: var(--color-text-default);
    font-weight: 500;
    font-size: 20px;
    text-align: center;
  }

  input {
    width: 100%;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 220px;
    margin: 0 auto;
  }
</style>