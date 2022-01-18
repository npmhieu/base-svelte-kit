<script lang="ts">

    import {enhancedUserStore} from "@stores/user-store";
</script>
{#if $enhancedUserStore.currentUser}
    <section>
        <div class="application-list">
            {#each ($enhancedUserStore.currentUser.applications || []) as application}
                <div class="application-item">
                    <div class="btn flat rounder accent darker font-bold mb-4">
                        {application.time.split(' ')[0]}
                    </div>
                    <div class="w-fit">
                        <div class="font-bold pb-2">
                            {application.id}
                        </div>
                        <div class="font-medium py-3 job-title">
                            <span class="text-brown">Job Title: {application.jobTitle}</span>
                        </div>
                    </div>

                    <div>
                            <span class="application-item--tag">
                                Sub Status: {application.subStatus || 'Unknown'}
                            </span>
                        <span class="application-item--tag">
                                Overall Stage: {application.overallStage || 'Unknown'}
                            </span>
                        <span class="application-item--tag">
                                Primary Recruiter: {application.primaryRecruiter || 'Unknown'}
                            </span>
                        <span class="application-item--tag">
                                Account: {application.account || 'Unknown'}
                            </span>
                    </div>
                </div>
            {/each}
        </div>
    </section>
{/if}
<style lang="scss">
  section {
    display: flex;
    flex-flow: column;
    height: 100%;

    .application-list {
      position: relative;
      padding-top: 40px;
      overflow: auto;
      flex: 1 1 0;

      .application-item {
        padding: 25px 60px 31px 0;
        margin-left: 94px;
        margin-right: 60px;
        background-color: #fff;
        position: relative;

        &:not(:last-child) {
          border-bottom: 1px solid rgba(#8e8e93, 0.3);
        }
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 100%;
          left: -49px;
          background-color: rgba(#8e8e93, 0.3);
        }
        &:after {
          content: '';
          position: absolute;
          border-radius: 50%;
          width: 11px;
          height: 11px;
          border: 1px solid var(--color-blue-darker);
          left: -54px;
          top: 40px;
          background-color: #fff;
          transition: .2s background-color ease-in-out;
        }


        &:hover:after {
          background-color: var(--color-blue-darker);
        }

        .application-item--tag {
          display: inline-flex;
          align-items: center;
          height: 22px;
          padding: 4px 11px 3px;
          border-radius: 10px;
          background-color: #edf1f7;
          font-weight: 500;
          margin-right: 9px;
          margin-bottom: 9px;
        }
      }
      .job-title {
        border-top: 1px solid rgba(#8e8e93, .3);
      }
    }
  }
</style>
