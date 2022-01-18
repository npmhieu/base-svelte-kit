<script context="module">
    import {browser} from '$app/env';
</script>
<script lang="ts">
    import {withPrevious} from 'svelte-previous';
    import {enhancedUserStore} from '@stores/user-store';
    import {pageStore} from '@stores/page.store';
    import MenuDropdown from '@components/shared/menu-dropdown.svelte';
    import CVTab from '@components/user-details/CandidateCVTab.svelte';
    import ProfileTab from '@components/user-details/CandidateProfileTab.svelte';
    import NoteTab from '@components/user-details/CandidateNoteTab.svelte';
    import ApplicationTab from '@components/user-details/CandidateApplicationTab.svelte';
    import Dialog from '@components/shared/dialog.svelte';
    import ActivityTab from '@components/user-details/CandidateActivityTab.svelte';
    import CVViewInNewTab from '@components/user-details/CVInNewTab.svelte';
    import {page} from '$app/stores';
    import {Candidate, ModalContext, UserDetailTab} from '@core/models';
    import {createQueryParamsStore} from '@stores/url.store'
    import {getContext, onMount} from 'svelte';
    import {CurrentPage} from '@core/constants';
    import {notificationStore} from '@stores/notification.store';

    const {open: openModal} = getContext('crm-modal');

    let tabQueryParam: any = createQueryParamsStore('tab');

    let activeTab: UserDetailTab;

    let pdfContent;

    let actionHeaderDropdown;
    let cddActionBtn;

    let currentUserId;

    let expandingCVView = false;

    let firstQueryUpdated = false;

    let isPurchasing = false;
    let confirmPurchase = null;
    const currentUser = enhancedUserStore.currentUser$;

    let zoomLevel = 1;

    const [currentTab, previousTab]: [UserDetailTab, UserDetailTab] = withPrevious(activeTab);
    const [user, previousUser]: [Candidate | any, Candidate | any] = withPrevious($enhancedUserStore.currentUser);
    $:
    {
        if (browser) {
            handleUserChanged();
        }
        if (browser && $currentUser && ((!$previousUser && !firstQueryUpdated)) || ($previousUser && $previousUser.userId !== $currentUser.userId)) {
            const tabFromQuery = $page.url.searchParams.get('tab');

            if (!tabFromQuery
                || ![UserDetailTab.CV, UserDetailTab.Profile, UserDetailTab.Activity, UserDetailTab.Note, UserDetailTab.Application].includes(tabFromQuery as any)
                || (!$currentUser.haveCV && tabFromQuery === UserDetailTab.CV)
            ) {
                // fallback to default tab
                updateActiveTab($currentUser.haveCV ? UserDetailTab.CV : UserDetailTab.Profile);
            } else {
                updateActiveTab(tabFromQuery as any);
            }
        }
    }

    function exportCV() {
        enhancedUserStore.exportCandidateCV($currentUser.userId);
    }

    function expandCVView() {
        expandingCVView = true;
        openModal(
            CVViewInNewTab,
            {
                pdfContent
            },
            {
                closeButton: true,
                closeOnEsc: true,
                closeOnOuterClick: true,
                styleCloseButton: {
                    boxShadow: 'none',
                    top: '7px',
                    right: '7px'
                },
                styleWindow: {
                    width: '100%',
                    maxWidth: '1020px'
                },
                styleContent: {
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'column',
                    padding: '37px 0 0'
                }
            },
            {
                onClosed: () => {
                    expandingCVView = false;
                }
            }
        )
    }

    async function purchaseContact() {
        if (isPurchasing) {
            return;
        }
        isPurchasing = true;
        const creditRequire = $currentUser.amountOfCreditRequired;
        if (creditRequire) {
            openModal(
                Dialog,
                {
                    title: `<span style="text-transform: uppercase">Comfirm spending credit?<br/>View full profile of ${$currentUser.fullName}</span>`,
                    message: `Are you sure to use ${creditRequire} credit${creditRequire > 1 ? 's' : ''} for this profile?`,
                    hasForm: false,
                    onConfirmed: purchaseConfirmed,
                    onCanceled: () => isPurchasing = false,
                },
                {
                    closeButton: true,
                    closeOnEsc: false,
                    closeOnOuterClick: true,
                },
                {
                    onClosed: (event) => {
                        if (['backdrop', 'closeButton'].includes(event?.eventSource)) {
                            isPurchasing = false;
                        }
                    },
                });
        } else {
            await purchaseConfirmed();
        }

    }

    async function purchaseConfirmed() {
        try {
            await enhancedUserStore.purchaseContact($currentUser.userId);
            notificationStore.success('GET CANDIDATE CONTACT SUCCESS');
            isPurchasing = false;
            await loadCandidateCV();
        } catch (e) {
            notificationStore.error('Purchase contact fail', {
                icon: 'alert-triangle'
            });
            isPurchasing = false;
        }
    }

    async function handleUserChanged() {
        if (currentUserId === $currentUser.userId) {
            return;
        }
        currentUserId = $currentUser.userId;
        zoomLevel = 1;
        await loadCandidateCV();
    }

    async function loadCandidateCV()
    {
        pdfContent = undefined; // reset state
        pdfContent = await enhancedUserStore.getCandidateCV(currentUserId);
    }


    function onActionDropdownClose({detail}) {

    }

    function updateActiveTab(tab: UserDetailTab): void {
        activeTab = tab;
        firstQueryUpdated = true;
        if (browser) {
            $tabQueryParam = tab;
        }
        // TODO - add tracking
    }
</script>

{#if $enhancedUserStore.currentUser}
    <section class="user-details">
        <div class="detail-header">
            <div class="tabs">
                <div class="tab-item" class:active={activeTab === UserDetailTab.Profile}
                     on:click={() => updateActiveTab(UserDetailTab.Profile)}>
                    Profile
                </div>
                {#if $enhancedUserStore.currentUser.haveCV}
                    <div class="tab-item" class:active={activeTab === UserDetailTab.CV}
                         on:click={() => updateActiveTab(UserDetailTab.CV)}>
                        CV
                    </div>
                {/if}
                <div class="tab-item" class:active={activeTab === UserDetailTab.Activity}
                     on:click={() => updateActiveTab(UserDetailTab.Activity)}>
                    Activity
                </div>
                <div class="tab-item" class:active={activeTab === UserDetailTab.Application}
                     on:click={() => updateActiveTab(UserDetailTab.Application)}>
                    Application
                </div>
                <div class="tab-item" class:active={activeTab === UserDetailTab.Note}
                     on:click={() => updateActiveTab(UserDetailTab.Note)}>
                    Note
                </div>
            </div>
            <div class="ml-auto mr-0 action-buttons">
                {#if $currentUser.isPaid}
                    {#if $currentUser.haveCV}
                        <button class="btn flat accent btn-download--cv"
                                tooltip={!$currentUser.exportableCVData ? $currentUser.cvStatus : ''}
                                flow="down"
                                class:disabled={!$currentUser.exportableCVData}
                                on:click={exportCV}>
                            Download CV
                        </button>
                    {/if}
                {:else}
                    <button class="btn flat accent btn-download--cv" on:click={purchaseContact}>
                        {$currentUser.haveCV ? 'View full CV' : 'Get contact'}
                    </button>
                {/if}
                <button class="btn stroke accent btn-more--action ml-2" bind:this={cddActionBtn}>
                    Action
                    <span class="ml-2 font-bold fe fe-chevron-down text-low-dark"></span>
                </button>

                <MenuDropdown
                        bind:this={actionHeaderDropdown}
                        hostElm={cddActionBtn} on:close={onActionDropdownClose}>
                    <ul class="action-dropdown-list">
                        <li>
                            <i class="prefix-icon"></i>
                        </li>
                    </ul>
                </MenuDropdown>
            </div>
        </div>
        <div class="detail-content">
            <div class="user-brief w-full">
                <img class="avatar mb-4" src={$currentUser.avatar}/>
                <div class="user-info flex-1">
                    <div class="user-title w-full">
                        <div class="mb-2 mt-4">
                            <div class="user-job-title">
                                {$currentUser.currentTitle}
                            </div>
                            <div class="user-name">
                                {$currentUser.fullName}
                            </div>
                        </div>
                    </div>
                    {#if activeTab !== UserDetailTab.CV}
                        <div class="flex items-center justify-between w-full text-xs font-medium">
                            {#if $currentUser.jobNecessityLevel}
                                <div class="job-ops text-brown font-medium inline-flex items-center">
                                    <i class="fe fe-sun mr-2"></i>
                                    {$currentUser.jobNecessityLevel}
                                </div>
                            {/if}
                            <div class="side-item inline-flex items-center text-[#4e4e4e] ml-auto mr-0">
                                {#if $currentUser.yob}
                                    <i class="fe fe-gift text-brown mr-2"></i>
                                    <span>
                                    Year of Birth: {$currentUser.yob}
                                </span>
                                    <span class="v-divider mx-3"></span>
                                {/if}
                                <i class="fe fe-edit-3 text-brown mr-2"></i>
                                <span>
                                    {$currentUser.updatedOn}
                                </span>
                            </div>
                        </div>
                    {:else}
                        <div class="user-contact flex items-center">
                            <div class="flex items-center">
                                <i class="fe fe-mail"></i>
                                {$currentUser.isPaid ? ($currentUser.email || 'Not provided') : 'Get contact to view'}
                            </div>
                            <div class="flex items-center">
                                <i class="fe fe-phone"></i>
                                {$currentUser.isPaid ? ($currentUser.phoneNumber || 'Not provided') : 'Get contact to view'}
                            </div>
                            <div class="flex items-center working-location">
                                <i class="fe fe-map-pin"></i>
                                { $currentUser.isPaid ? ($currentUser.workingLocation || 'Not provided') : 'Get contact to view'}
                            </div>
                        </div>
                    {/if}
                </div>

                {#if activeTab === UserDetailTab.CV && $pageStore.currentPage !== CurrentPage.CandidateDetailInNewTab}
                    <a class="btn-open-new-tab" target="_blank" href="candidate-detail/{$currentUser.userId}">
                        Open in new tab
                    </a>
                {/if}

                {#if activeTab === UserDetailTab.CV && pdfContent}
                    <div class="zoom-wrapper">
                        {#if !expandingCVView}
                            <button on:click={expandCVView} tooltip="Expand CV" flow="down">
                                <img class="expand-cv" src="/images/expand.png"/>
                            </button>
                        {/if}
                    </div>
                {/if}
            </div>
            {#if activeTab === UserDetailTab.Profile}
                <ProfileTab/>
            {:else if activeTab === UserDetailTab.Note}
                <NoteTab/>
            {:else if activeTab === UserDetailTab.Activity}
                <ActivityTab/>
            {:else if activeTab === UserDetailTab.Application}
                <ApplicationTab/>
            {/if}
            {#if $currentUser.haveCV && browser}
                <CVTab visible={activeTab === UserDetailTab.CV} {pdfContent} {zoomLevel}
                       on:cvRenderError={() => enhancedUserStore.markCandidateCVAsError($currentUser.userId)}/>
            {/if}
        </div>
    </section>
{:else}
    <section class="no-user-selected">
        <div class="select-user-text flex items-center justify-center">
        <span class="mt-auto">
            Select a Candidate to view
        </span>
        </div>
    </section>
{/if}

<style lang="scss">
  .cv-wrapper {
    display: flex;
    flex: 1 1 0;
    overflow: auto;
    position: relative;
  }

  .expand-cv {
    user-select: none;
    cursor: pointer;
    width: 24px;
  }

  .btn-download--cv {
    &.disabled {
      color: var(--color-text-default);
      background: #f7f9fc!important;
      &:hover {
        box-shadow: inset 0 0 0 1px #fa5d5d;
      }
    }
  }

  .btn-open-new-tab {
    position: absolute;
    top: 20px;
    right: 70px;
  }

  .zoom-wrapper {
    position: absolute;
    top: 20px;
    right: 26px;
  }

  .working-location {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    white-space: nowrap;
  }

  ul.action-dropdown-list {
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    background-color: #f9fafb;
    margin: 5px;
    max-height: 483px;
    overflow: auto;
    padding-left: 8px;
    padding-right: 8px;

    li {
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #434b52;
      display: flex;
      cursor: pointer;
      align-items: center;

      &:hover, &:focus {
        .prefix-icon {
          color: var(--color-blue);
        }

        background-color: #ebf1ff;
      }
    }
  }

  .user-details {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
    min-width: 800px;
  }

  .action-buttons {
    button.btn {
      font-size: 12px;
      font-weight: 500;
    }
  }

  .user-brief {
    display: flex;
    flex: 0 1 auto;
    height: 118px;
    min-height: 118px;
    max-height: 118px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    align-items: center;
    padding: 20px 20px 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    position: relative;
    z-index: 2;

    .user-contact {
      height: 25px;

      > div {
        color: var(--color-brown);
        font-weight: 500;

        i {
          margin-right: 8px;
        }

        &:not(:last-child) {
          margin-right: 24px;
        }
      }
    }

    .v-divider {
      background-color: #8e8e93;
      opacity: .3;
      width: 1px;
      height: 14px;
    }

    .side-item {
      padding: 5px 15px 4px 13px;
      border-radius: 8px;
      background-color: #f3f4f6;
    }

    .user-info {
      padding: 0 25px;
      flex: 1 0 auto;

      .user-job-title {
        color: var(--color-dark-low);
        font-weight: 500;
        font-size: 12px;
      }

      .user-name {
        font-weight: bold;
        font-size: 14px;
      }
    }

    .avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  }

  .detail-header {
    padding: 0 15px 0 27px;
    height: 44px;
    border-radius: 10px;
    margin: 4px 4px 23px;
    box-shadow: 0 3px 6px 0 rgba(27, 58, 146, 0.16);
    background-color: #fdfefe;
    display: flex;
    align-items: center;

    .tabs {
      display: flex;
      align-items: center;

      .tab-item {
        height: 100%;
        padding: 10px 30px;
        position: relative;
        font-size: 12px;
        font-weight: 600;
        color: #d9d9d9;

        &:not(.disabled) {
          cursor: pointer;

          &:hover {
            background-color: rgba(var(--color-dark-dim), 0.5);
          }
        }

        &:not(:first-child):before {
          content: '';
          position: absolute;
          width: 1px;
          height: 15px;
          top: 11px;
          left: 0;
          background-color: var(--color-dark-dim);
        }

        &.active {
          color: var(--color-blue);

          &:after {
            content: '';
            position: absolute;
            background-color: var(--color-blue);
            width: 100%;
            bottom: -5px;
            left: 0;
            height: 2px;
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
          }
        }
      }
    }
  }

  .detail-content {
    border-radius: var(--border-radius);
    background-color: #fff;
    flex: 1 1 0;
    display: flex;
    flex-flow: column;
    overflow: visible;
  }

  .no-user-selected {
    background: #f9f9f9;

    .select-user-text {
      width: 400px;
      height: 400px;
      background: url('/images/select-to-view.svg') no-repeat center center/300px;
      color: #707070;
    }
  }

  :global(.cv-tab) {
    height: calc(100% - 102px);
  }
</style>
