<script>
    // Made by Kevin Åberg Kultalahti
    // Twitter: @kevmodrome
    // Don't miss Svelte Summit: https://sveltesummit.com
    import ChildTest from '@components/ChildTest.svelte';
    import {notificationStore} from "@stores/notification.store";

    let url = "https://api.github.com/users/mojombo";

    // import fetchStore from '@stores/fetch.store.js'
    // const [data, loading, error, getData] = fetchStore(url)

    import testStore from '@stores/test.store.js'
    const {data, getData} = testStore();

    $:dataMap = $data;

    async function localGet(){
        await getData(url);
        notificationStore.success('GET CANDIDATE CONTACT SUCCESS', {});
        notificationStore.error('GET CANDIDATE CONTACT SUCCESS', {});
    }



</script>

<button on:click="{localGet}">
    Fetch again
</button>

<ChildTest {dataMap} />
<!--{#if $loading}-->
<!--    Loading: {$loading}-->
<!--{:else if $error}-->
<!--    Error: {$error}-->
<!--{:else}-->
<!--    <pre>{JSON.stringify($data, null, 2)}</pre>-->
<!--{/if}-->

<pre>{JSON.stringify($data, null, 2)}</pre>