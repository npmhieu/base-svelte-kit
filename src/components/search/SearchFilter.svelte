<script>

    // IMPORT

    import {userStore, currentUser} from '@stores/user-store';
    import {userSearchStore, search} from '@stores/user-search.store';
    import {searchFiltersStore, DefaultSearchString, searchQueryStore} from '@stores/search-filters.store';

    import UpdateTimeFilter from '@components/search/filters/update-time.svelte';
    import JobFunctionFilter from '@components/search/filters/job-functions.svelte';
    import JobIndustryFilter from '@components/search/filters/job-industries.svelte';
    import JobLocationFilter from '@components/search/filters/job-locations.svelte';
    import SalaryFilter from '@components/search/filters/salary.svelte';
    import NationFilter from '@components/search/filters/nationality.svelte';
    import LanguageFilter from '@components/search/filters/language.svelte';
    import CandidateSource from '@components/search/filters/candidate-source.svelte';
    // import AgeFilter from '@components/search/filters/age.svelte';


    // METHODS

    const onKeyPress = async (e) => {
        if (e.charCode === 13) {
            await search()
        }
    };

</script>

<section id="searchFilter" class="search-filter">
    <!-- search filter here -->
    <div class="row">
        <div class="col-8">
            <input type="text" bind:value={$searchQueryStore.stringFind} on:keypress={onKeyPress}
                   class="search-input" placeholder="Search job title or keyword"/>
        </div>
        <div class="col-4">
            <button class="btn search-button" on:click="{search}">Search</button>
            <button class="btn save-button">
                <span class="material-icons-outlined ">save</span>
            </button>

            <div class="dropdown">
                <button class="btn src-button dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Candidate list
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Purchased Candidate</a></li>
                    <li><a class="dropdown-item" href="#">Shortlisted Candidate</a></li>
                    <li><a class="dropdown-item" href="#">Noted Candidate</a></li>
                </ul>
            </div>




        </div>
    </div>

    <div class="row filter-row">
        <div class="col-8">
            <div class="flex-start">
                <!--<UpdateTimeFilter/>-->
                <JobIndustryFilter/>
                <JobFunctionFilter/>
                <NationFilter/>
                <JobLocationFilter/>
                <LanguageFilter/>
                <SalaryFilter/>
                <!--<AgeFilter/>-->
            </div>


        </div>
        <div class="col-4">
            <CandidateSource/>
        </div>
    </div>

</section>

<style>

</style>
