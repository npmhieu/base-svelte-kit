<script context="module">
    export const tabsKey = {};
</script>

<script>
    import { setContext, onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const tabs = writable([]);
    const selectedTab = writable(null);

    setContext(tabsKey, {
        tabs,
        selectedTab,
    });

    onMount(() => {
        if ($tabs.length > 0)
            $selectedTab = $tabs[0];
    });
</script>

<style>
    .tab-content {
        padding: 10px;
        background: lightgrey;
    }
</style>

<div class="tab-control">
    <div class="tabs">
        <slot isTitle={true} isContent={false}/>
    </div>
    <div class="tab-content">
        <slot isTitle={false} isContent={true}/>
    </div>
</div>