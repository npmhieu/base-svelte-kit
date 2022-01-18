<script>
    // Made by Kevin Åberg Kultalahti
    // Twitter: @kevmodrome
    // Don't miss Svelte Summit: https://sveltesummit.com
    import ChildTest from '@components/ChildTest.svelte';
    import {notificationStore} from "@stores/notification.store";

    let url = "https://api.github.com/users/mojombo";

    // import fetchStore from '@stores/fetch.store.js'
    // const [data, loading, error, getData] = fetchStore(url)

    import {loading, error, sampleData} from '@sample/stores/sample.store.js'

    $:dataMap = $sampleData;

    async function localGet(){
        await sampleData(url);
        notificationStore.success('GET CANDIDATE CONTACT SUCCESS', {});
        notificationStore.error('GET CANDIDATE CONTACT SUCCESS', {});
    }



</script>

<button on:click="{localGet}">
    Fetch again
</button>
<pre>{JSON.stringify($data, null, 2)}</pre>

{#if $loading}
    Loading: {$loading}
{:else if $error}
    Error: {$error}
{:else}
    <pre>{JSON.stringify($data, null, 2)}</pre>
{/if}

from child
<ChildTest {dataMap} />
