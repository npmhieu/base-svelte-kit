<script>

    import 'virtual:windi.css';
    import '@styles/main.scss';
    import Toast from '@components/shared/Toast.svelte';
    import Modal from '@components/shared/EnhancedModal.svelte';
    import { modalStore } from '@stores/modal.store';
    import '@core/extentions';

    import '../styles/common.css';

</script>
<svelte:head>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet">

</svelte:head>

<Toast />
<Modal show={$modalStore}>
    <main class="container-fluid px-0 system-font-stack">
        <slot />
    </main>
</Modal>

<style>
    :global(body, html, #svelte) {
        width: 100vw;
        min-height: 100vh;
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        background-color: #f7f9fc;
    }
    :global(#svelte) {
        display: flex;
        flex-direction: column;
    }
    main {
        flex: 1;
        /*margin-top: 3rem;*/
    }
</style>