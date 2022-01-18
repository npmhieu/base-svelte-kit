<script>
    export let dataMap;

    function executeChildFunction(dataMap) {
        //Process received dataMap
        console.log('process ', dataMap)
    }

    $: executeChildFunction(dataMap);

</script>

<div>
    {dataMap}
</div>

<!--{#if $loading}-->
<!--    Loading: {$loading}-->
<!--{:else if $error}-->
<!--    Error: {$error}-->
<!--{:else}-->
<!--    <pre>{JSON.stringify($data, null, 2)}</pre>-->
<!--{/if}-->

<!--<pre>{JSON.stringify($data, null, 2)}</pre>-->