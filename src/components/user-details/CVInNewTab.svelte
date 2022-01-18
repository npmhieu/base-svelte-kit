<script>
    import {getContext} from 'svelte';

    export let pdfContent;

    const {close} = getContext('crm-modal');
    import CVTab from '@components/user-details/CandidateCVTab.svelte';
</script>
<div class="cv-wrapper">
    <CVTab bind:pdfContent={pdfContent} zoomLevel="1.2"/>
</div>
<style lang="scss">
    .cv-wrapper {
      overflow: auto;
      padding: 0 10px;
    }
    :global(.cv-wrapper .cv-content-wrapper) {
      width: 1000px;
    }
</style>
