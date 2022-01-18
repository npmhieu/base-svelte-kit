<script lang="ts">

    import {enhancedUserStore} from "@stores/user-store";
</script>
{#if $enhancedUserStore.currentUser}
    <section>
        <div class="activity-list">
            {#each ($enhancedUserStore.currentUser.activities || []) as activity}
                <div class="activity-item">
                    <div class="btn flat rounder accent darker font-bold mb-4">
                        {activity.time.split(' ')[0]}
                    </div>
                    <div>
                        <p class="font-bold text-blue-darker">{activity.name}</p>
                        <div class="text-low-dark">
                            {activity.content}
                        </div>
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

    .activity-list {
      position: relative;
      padding-top: 40px;
      overflow: auto;
      flex: 1 1 0;

      .activity-item {
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
      }

    }
  }
</style>
