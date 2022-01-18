<script>


    import { profile} from '@stores/user-store';
    import { selectedUser } from '@stores/user-store';

    $:experiences = $profile.experiences ? $profile.experiences : {}
    $:expectations = $profile.expectations ? $profile.expectations : {}

</script>

{#if $profile}
    <div class="profile-wrapper">
        <section class="contact">
            <div class="row">
                <div class="col-12">
                    <p class="note">Please note,<br/>
                        Candidate would like to contact by</p>
                </div>

                <div class="col-4">
                    <p class="info-line"><strong>Email:</strong> {$selectedUser.isPaid ? $selectedUser.email : 'Get contact to view'}</p>
                </div>
                <div class="col-8">
                    <p class="info-line"><strong>SMS:</strong> {$selectedUser.isPaid ? $selectedUser.phone : 'Get contact to view'}</p>
                </div>
                <div class="col-4">
                    <p class="info-line"><strong>Phone:</strong> {$selectedUser.isPaid ? $selectedUser.phone : 'Get contact to view'}</p>
                </div>
            </div>

        </section>
        <section class="history">
            <h3 class="section-header">MY EMPLOYMENT HISTORY</h3>

            {#if $profile.employmentHistory}
                {#each $profile.employmentHistory as item, i}
                    <div class="history-item">
                        <p class="mb-0"><strong>{item.jobTitle} at {item.companyName}</strong></p>
                        <p class="info-line fw-300 mb-3">{item.startOn}</p>
                        <div class="row">
                            <div class="col-4"><strong>Gross salary range:</strong></div>
                            <div class="col-8"><p class="info-line"> {item.salary}</p></div>
                        </div>
                        <div class="row">
                            <div class="col-4"><strong>My focus industries:</strong></div>
                            <div class="col-8"><p class="info-line"> { item.industries ? item.industries.join(', ') : '' }</p></div>
                        </div>
                        <div class="row">
                            <div class="col-4"><strong>My focus functions:</strong></div>
                            <div class="col-8"><p class="info-line"> {item.functions ? item.functions.join(', ') : '' }</p></div>
                        </div>
                    </div>
                {/each}
            {/if}

        </section>
        <section class="experience">
            <h3 class="section-header">MY EXPERIENCE</h3>

            <div class="row">
                <div class="col-4"><strong>Industries I’ve Been Working:</strong></div>
                <div class="col-8"><p class="info-line"> { experiences.industries ? experiences.industries.join(', ') : '' }</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Functions I’ve Got Experienced:</strong></div>
                <div class="col-8"><p class="info-line"> {experiences.functions ? experiences.functions.join(', ') : '' }</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>My Current Position Level:</strong></div>
                <div class="col-8"><p class="info-line"> English/Beginner, Bulgarian/Intermediate</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Languages I’m Using For Professional:</strong></div>
                <div class="col-8"><p class="info-line"> English/Beginner, Bulgarian/Intermediate</p></div>
            </div>
        </section>
        <section class="expectation">
            <h3 class="section-header">MY EXPECTATION</h3>
            <div class="row">
                <div class="col-4"><strong>Industries I’d Like To Work:</strong></div>
                <div class="col-8"><p class="info-line"> { expectations.industries ? expectations.industries.join(', ') : '' }</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Functions I’d Like To Work:</strong></div>
                <div class="col-8"><p class="info-line"> { expectations.functions ? expectations.functions.join(', ') : '' }</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Expected Monthly Gross Salary:</strong></div>
                <div class="col-8"><p class="info-line"> {expectations.salary}</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Position Level I Prefer:</strong></div>
                <div class="col-8"><p class="info-line"> Oil & Gas Drilling</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Working Location:</strong></div>
                <div class="col-8"><p class="info-line"> { expectations.locations ? expectations.locations.join(', ') : '' }</p></div>
            </div>
            <div class="row">
                <div class="col-4"><strong>Language:</strong></div>
                <div class="col-8"><p class="info-line"> { expectations.languages ? expectations.languages.join(', ') : '' }</p></div>
            </div>
        </section>

        <section class="education">

            <h3 class="section-header">MY EDUCATION</h3>
            <div class="row">
                <div class="col-4"><strong>My Highest Degree:</strong></div>
                <div class="col-8"><p class="info-line"> {$profile.highestDegreeName}</p></div>
            </div>
        </section>
    </div>
{:else}
    <h1>Profile not found please try again</h1>
{/if}

<style>

</style>