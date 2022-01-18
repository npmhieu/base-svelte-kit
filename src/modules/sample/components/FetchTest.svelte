<script>
    // Made by Kevin Åberg Kultalahti
    // Twitter: @kevmodrome
    // Don't miss Svelte Summit: https://sveltesummit.com
    import ChildTest from '@sample/components/ChildTest.svelte';
    import {notificationStore} from "@stores/notification.store";

    let url = "https://api.github.com/users/mojombo";

    // import fetchStore from '@stores/fetch.store.js'
    // const [data, loading, error, getData] = fetchStore(url)

    import {loading, error, data, getData} from '@sample/stores/test.store.js'
    // const {loading, error, data, getData} = testStore();

    $:dataMap = $data;

    async function localGet(){
        await getData(url);
        notificationStore.success('GET CANDIDATE CONTACT SUCCESS', {});
        // notificationStore.error('GET CANDIDATE CONTACT SUCCESS', {});
    }



</script>

<button on:click="{localGet}">
    Fetch again
</button>


{#if $loading}
loading...
{:else if $error}
    Error: {$error}
{:else}
    <pre>{JSON.stringify($data, null, 2)}</pre>
{/if}

<ChildTest {dataMap} />

<style>
    .content-block {
        background-color: #fff;
        width: 90%;
        height: 90%;
        margin: auto;
        border: 1px solid #dddfe2;
        border-radius: 3px;
    }

    .loader-wrapper {
        height: 300px;
        padding: 12px;
    }

    .loader-animation {
        background: #f5f6f7;
        height: 107px;
        width: 441px;
        overflow: hidden;
        position: relative;

    &:before {
         background-color: #f5f6f7;
         background-image: url(https://i.postimg.cc/VLC3WF9t/3pk-Fb-IT7-rn.gif);
         background-repeat: repeat-y;
         background-size: 100% 1px;
         content: ' ';
         display: block;
         height: 100%;
     }

    svg {
        position: absolute;
        fill: #fff;
        top: 0;
        left: -1px;
        width: 442px;
        height: 107px;
    }
    }
</style>