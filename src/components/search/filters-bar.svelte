<script lang="ts">
    import UpdateTimeFilter from './filters/update-time.svelte';
    import JobFunctionFilter from './filters/job-functions.svelte';
    import JobIndustryFilter from './filters/job-industries.svelte';
    import JobLocationFilter from './filters/job-locations.svelte';
    import SalaryFilter from './filters/salary.svelte';
    import NationFilter from './filters/nationality.svelte';
    import LanguageFilter from './filters/language.svelte';
    import CandidateSource from './filters/candidate-source.svelte';
    import AgeFilter from './filters/age.svelte';
</script>

<section>
    <JobIndustryFilter/>
    <JobFunctionFilter/>
    <NationFilter/>
    <UpdateTimeFilter/>
    <LanguageFilter/>
    <JobLocationFilter/>
    <SalaryFilter/>
    <AgeFilter/>
    <CandidateSource/>
</section>


<style lang="scss">
    section {
      display: flex;
      width: 100%;
      align-items: center;
      > :global(*) {
        margin: 0 8px;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }

      :global(button.btn-filter) {
        box-shadow: inset 0 0 0 1px #aaaaae;
        color: #808080;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        line-height: 30px;
        border-radius: 7px;
        font-size: 11px;
        font-weight: 600 !important;
        border: none;
        transition: .2s background-color ease-in-out;

        &:hover, &:active, &:focus {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }

    :global(.modal-wrapper .footer button) {
      border-radius: 26px;
      height: 36px;
      display: inline-flex;
    }
    :global(.modal-wrapper .footer .apply) {
      color: #fff;
      background-color: var(--color-blue);
    }

    :global(.modal-wrapper .footer .apply) {
      color: #fff;
      background-color: var(--color-blue);
    }

</style>
