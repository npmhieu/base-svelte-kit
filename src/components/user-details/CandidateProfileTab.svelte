<script lang="ts">

    import {enhancedUserStore} from "@stores/user-store";

    const user = enhancedUserStore.currentUser$;
</script>
{#if $user}
    <div class="user-profile-section">
        <div class="font-light italic text-low-dark text-xs mb-6">
            Please note,<br/>
            Candidate would like to contact by
        </div>

        <div class="columns-2 user-contact">
            <div>
                <b>Email:</b> {$user.isPaid ? ($user.email || 'Not provided') : 'Get contact to view'}
            </div>
            <div>
                <b>SMS:</b> {$user.isPaid ? ($user.phoneNumber || 'Not provided') : 'Get contact to view'}
            </div>
            <div>
                <b>Phone:</b> {$user.isPaid ? ($user.phoneNumber || 'Not provided') : 'Get contact to view'}
            </div>
        </div>
        {#if $user.employmentHistory && $user.employmentHistory.length}
            <div class="mb-5">
                <div class="profile-section-header">
                    MY EMPLOYMENT HISTORY
                </div>
                {#each $user.employmentHistory as employment}
                    <div class="employment-item">
                        <div class="my-5">
                            <p class="font-bold">
                                {employment.jobTitle}
                                {#if employment.companyName} at {employment.companyName} {/if}
                            </p>
                            <p class="text-low-dark">
                                {employment.startOn}
                                {#if employment.endOn} - {employment.endOn} {/if}
                            </p>
                        </div>

                        <div class="info-col">

                            {#if employment.salary}
                                <div>
                        <span>
                            Gross salary range:
                        </span>
                                    <span>
                            {employment.salary}
                        </span>
                                </div>
                            {/if}

                            {#if employment.industries}
                                <div>
                        <span>
                            My focus industries:
                        </span>
                                    <span>
                            {employment.industries.join(', ')}
                        </span>
                                </div>
                            {/if}

                            {#if employment.functions}
                                <div>
                        <span>
                            My focus functions:
                        </span>
                                    <span>
                            {employment.functions.join(', ')}
                        </span>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        {#if $user.experiences && ($user.experiences.functions?.length || $user.experiences.industries?.length)}
            <div class="mb-5">
                <div class="profile-section-header">
                    MY EXPERIENCE
                </div>
                <div class="info-col">

                    {#if $user.experiences.industries?.length}
                        <div>
                        <span>
                            Industries I’ve Been Working:
                        </span>
                            <span>
                            {$user.experiences.industries.join(', ')}
                        </span>
                        </div>
                    {/if}
                    {#if $user.experiences.functions?.length}
                        <div>
                        <span>Functions I’ve Got Experienced:</span>
                            <span>
                            {$user.experiences.functions.join(', ')}
                        </span>
                        </div>
                    {/if}
                    {#if $user.experiences.jobLevel?.length}
                        <div>
                        <span>My Current Position Level:</span>
                            <span>
                            {$user.experiences.jobLevel.join(', ')}
                        </span>
                        </div>
                    {/if}
                    {#if $user.experiences.languages?.length}
                        <div>
                        <span>Languages I'm Using For Professional:</span>
                            <span>
                            {$user.experiences.languages.join(', ')}
                        </span>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        {#if $user.expectations || $user.workingLocation}
            <div className="mb-5">
                <div class="profile-section-header">
                    MY EXPECTATION
                </div>
                <div class="info-col">
                    {#if $user.expectations?.industries}
                        <div>
                        <span>
                            Industries I’ve Been Working:
                        </span>
                            <span>
                            {$user.expectations.industries.join(', ')}
                        </span>
                        </div>
                    {/if}

                    {#if $user.workingLocation}

                        <div>
                        <span>
                            Working Location:
                        </span>
                            <span>
                            {$user.workingLocation}
                        </span>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        {#if $user.highestDegreeName}
            <div className="mb-5">
                <div class="profile-section-header">
                    MY EDUCATION
                </div>
                <div class="info-col">
                        <div>
                        <span>
                            My Highest Degree:
                        </span>
                            <span>
                            {$user.highestDegreeName}
                        </span>
                        </div>
                </div>
            </div>
        {/if}


    </div>
{/if}
<style lang="scss">
  .employment-item {
    &:not(:last-child) {
      padding-bottom: 20px;
      border-bottom: 1px dashed #808080;
    }
  }

  .info-col {
    > div {
      display: flex;
      margin: 10px 0;

      span {
        flex: 1;

        &:first-child {
          width: 250px;
          font-weight: bold;
        }
      }
    }
  }

  .user-contact {
    width: 600px;

    div {
      margin-bottom: 10px;
    }
  }

  .user-profile-section {
    padding: 30px 46px;
    overflow: auto;
    flex: 1 1 0;
  }

  .profile-section-header {
    color: var(--color-brown);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-brown);
    font-size: 12px;
    font-weight: 500;
    padding-bottom: 6px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
