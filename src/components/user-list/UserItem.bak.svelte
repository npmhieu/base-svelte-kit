<script lang="ts">


    // user item

    import {Candidate, CandidateItemInfo} from '@core/models';

    export let user: Candidate | CandidateItemInfo;

    import {userStore} from '@stores/user-store';


    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function emitClickEvent(event) {
        dispatch('userItemClick', {
            user,
            event
        })
    }


</script>
{#if user}
    <div class="user-item" class:active={$userStore.selectedId === user.userId}
         on:click|preventDefault={emitClickEvent}>
        <section class="user-info-container w-full">
            <div class="bio flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                    <span class="username">{user.fullName}</span>
                    <div class="ml-auto flex">
                        <!--                        <span class="candidate-tag viewed ml-1">Viewed</span>-->
                        <!--                            <span class="candidate-tag updated ml-4">Updated</span>-->
                        <!--                            <span class="candidate-tag salesforce ml-4">SalesForce</span>-->
                        <!--                            <span class="ml-8 text-boxed tag-note">-->
                        <!--                                3 notes-->
                        <!--                            </span>-->
                        <!--                            <pm-icon color="#fb8c00" size="16" class="ml-8" font="feather" name="alert-circle"-->
                        <!--                                     matTooltip="Not PR1 candidate" *ngIf="user.isUnqualified">-->
                        <!--                            </pm-icon>-->
                        <!--                            <pm-icon color="#fb8c00" size="16" class="ml-8" font="feather" name="alert-circle"-->
                        <!--                                     matTooltip="Pending candidate" *ngIf="user.isPending">-->
                        <!--                            </pm-icon>-->
                        <!--                            <pm-icon color="#fb8c00" size="16" class="ml-8" font="feather" name="alert-circle"-->
                        <!--                                     matTooltip="Unofficial user" *ngIf="user.isUnOfficial">-->
                        <!--                            </pm-icon>-->
                    </div>
                </div>
            </div>
            <div class="current-job text-truncate">
                {user.currentTitle}
            </div>

            <ul>
                {#if user.currentCompanyName}
                    <li class="company">
                <span class="label">
                    Company:
                </span>
                        <span class="wrap">{user.currentCompanyName}</span>
                    </li>
                {/if}
                {#if user.currentSalary}
                    <li class="flex justify-between items-center">
                <span>
                    Salary: {user.currentSalary}
                </span>
                    </li>
                {/if}
            </ul>

            <div class="last-activity-timestamp text-xs flex ml-3 flex justify-start items-start">
                <span class="flex justify-center items-center">
                    <i class="fe fe-rotate-ccw mr-2"></i>
                    {user.updatedOn}
                </span>
            </div>
        </section>

        <!--            <div class="loading-more-recommend-candidates"-->
        <!--                <mat-spinner color="accent" diameter="20"></mat-spinner>-->
        <!--                <span class="mt-12">-->
        <!--            We're selecting more candidates on your search...-->
        <!--        </span>-->
        <!--            </div>-->
    </div>
{/if}

<style lang="scss">

  .user-item {
    display: flex;
    overflow: hidden; // hide selected candidate line corner
    align-items: center;
    position: relative;
    padding: 16px 15px 16px 28px;
    text-transform: none;
    flex-shrink: 0;
    cursor: pointer;
    margin-left: 12px;
    background: #fff;
    max-width: 444px;
    min-width: 360px;

    border-radius: 10px;
    height: 120px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    margin-bottom: 12px;
    transition: .2s box-shadow ease-in-out;

    &:hover {
      box-shadow: 0 2px 4px 2px rgb(0 0 0 / 15%);
    }

    .tag-note {
      background-color: #dee8ff !important;
    }

    .badge-sf-candidate {
      background-color: var(--color-brown);
      padding: 1px 5px;
      border-radius: 6px;
      color: #fff;
      font-size: 8px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
      font-weight: 500;
    }

    &.selected {
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 6px;
        height: 100%;
        background-color: var(--color-brown);
      }
    }

    > * {
      display: flex;
      flex: 0 1 auto;
    }

    .user-info-container {
      flex-flow: column;
      position: relative;
      min-height: 80px;
      justify-content: flex-start;

      .bio, .current-job {
        margin-bottom: 6px;
        text-transform: capitalize;
      }

      .username {
        font-size: 12px;
        font-weight: 500;
        color: var(--color-brown)
      }

      .current-job {
        font-weight: 600;
        color: var(--color-dark);
        font-size: 12px;
      }

      .last-activity-timestamp {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--color-dark-low);

        .icon {
          min-width: 16px;
          min-height: 16px;
          width: 16px;
          height: 16px;
          color: #d9d9d9;
        }
      }

      ul {
        list-style: none;
        padding-inline-start: 0;
        font-size: 13px;
        margin: 0;
        max-width: 285px;

        li {
          position: relative;
          color: var(--color-dark);
          font-weight: 400;
          font-size: 12px;

          &:not(:last-child) {
            margin-bottom: 6px;
          }

          &.company {
            display: flex;

            .wrap {
              padding-left: 4px;
              overflow: hidden;
              display: -webkit-inline-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
</style>
