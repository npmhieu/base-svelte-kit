<script>
    import {selectedUser, selectedTab, loadUserTab, resumeUrl, userStore} from '@stores/user-store';

    import ProfileTab from '@components/user-details/ProfileTab.svelte';
    import ResumeTab from '@components/user-details/ResumeTab.svelte';
    // import CVTab from '@components/user-details/CandidateCVTab.svelte';
    import ActivityTab from '@components/user-details/ActivityTab.svelte';
    import ApplicationTab from '@components/user-details/ApplicationTab.svelte';
    import NoteTab from '@components/user-details/NoteTab.svelte';
    import PurchaseModal from '@components/search/modals/PurchaseModal.svelte';
    import CVViewInNewTab from "@components/user-details/CVInNewTab.svelte";
    import {getContext} from "svelte";

    const {open: openModal} = getContext('crm-modal');

    // onMount(async () => {
    //     await loadUserDetail();
    // });

    let expandCVModalOpened = false;
    let activeUserId = null;

    $: {
        if (activeUserId !== $selectedUser.userId) {
            activeUserId = $selectedUser.userId;

        }
    }

    function expandCVView() {
        expandCVModalOpened = true;
        openModal(
            CVViewInNewTab,
            {
                pdfContent: $userStore.users[$selectedUser.userId].cvContent
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
                    expandCVModalOpened = false;
                }
            }
        )
    }

    async function selectTab(tab) {

        $selectedTab = tab;
        await loadUserTab();
    }

    function downloadResume() {
        window.open($resumeUrl, '_blank').focus();
    }

</script>

<div class="user-detail">
    <div class="user-header flex-space-between">

        <div class="tab-buttons">
            <span class:active="{$selectedTab === 1}" on:click="{() => selectTab(1)}">Profile</span>
            <span class:active="{$selectedTab === 2}" on:click="{() => selectTab(2)}">CV</span>
            <span class:active="{$selectedTab === 3}" on:click="{() => selectTab(3)}">Activity</span>
            <span class:active="{$selectedTab === 4}" on:click="{() => selectTab(4)}">Application</span>
            <span class:active="{$selectedTab === 5}" on:click="{() => selectTab(5)}">Note</span>
        </div>


        <div class="action-buttons ml-auto">
            {#if $selectedUser.isPaid}
                {#if $selectedUser.haveCV}
                    <button type="button" class="btn download-button"
                            on:click="{downloadResume}">Download CV</button>
                {/if}
            {:else}
                <PurchaseModal/>
            {/if}

            <div class="dropdown">
                <button class="btn action-button dropdown-toggle" type="button" id="dropdownSort"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Action
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownSort">
                    <li><a class="dropdown-item" href="#">Add to shortlist</a></li>
                    <li><a class="dropdown-item" href="#">Apply to job</a></li>
                    <li><a class="dropdown-item" href="#">Send email</a></li>

                </ul>
            </div>


        </div>

    </div>

    <div class="user-content ">


        <div class="user-general">

            <div class="avatar-card flex-start">
                <div class="avatar-wrapper">
                    <div class="el-wrapper11">
                        <div class="el-inner">
                            <img src='https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_1280.jpg'
                                 class='el-img-fit'>
                        </div>
                    </div>
                </div>


                <div class="user-info">
                    <p class="current-title">{$selectedUser.currentTitle}</p>
                    <p class="full-name">{$selectedUser.fullName}</p>

                    {#if 1 === $selectedTab}

                        <div class="flex-space-between">
                                                    <span class="job-status">
                                                        <span class="material-icons-outlined">light_mode</span>
                                                        I am looking for new opportunity
                                                    </span>
                            <span class="user-status px-3">
                                                        <span class="dob">Year of Birth: 1999</span>
                                                        Updated 13 days ago
                                                    </span>
                        </div>

                    {:else}
                        <div class="user-contact">
                            <span>{$selectedUser.isPaid ? $selectedUser.email : 'Get contact to view'}</span>
                            <span>{$selectedUser.isPaid ? $selectedUser.phone : 'Get contact to view'}</span>
                            <span>Ho Chi Minh</span>
                        </div>
                    {/if}
                </div>
            </div>

            {#if 2 === $selectedTab && $selectedUser.haveCV}
                <a class="btn-open-new-tab" target="_blank" href="candidate-detail/{$selectedUser.userId}">
                    Open in new tab
                </a>
                <div class="zoom-wrapper">
                    {#if !expandCVModalOpened && $userStore.users[$selectedUser.userId].cvContent}
                        <button on:click={expandCVView} tooltip="Expand CV" flow="down">
                            <img class="expand-cv" src="/images/expand.png"/>
                        </button>
                    {/if}
                </div>
            {/if}
        </div>

        <div class="scroll-wrapper">
            <div class="inner">
                <div class="tab-content">
                    {#if 1 === $selectedTab}

                        <ProfileTab/>

                    {:else if 2 === $selectedTab}

                        <ResumeTab/>

                    {:else if 3 === $selectedTab}
                        <ActivityTab/>

                    {:else if 4 === $selectedTab}
                        <ApplicationTab/>

                    {:else if 5 === $selectedTab}
                        <NoteTab/>

                    {:else}
                        <ProfileTab/>
                    {/if}
                </div>
            </div>
        </div>


    </div>

</div>

<style lang="scss">
  .zoom-wrapper {
    position: absolute;
    top: 22px;
    right: 26px;

    .expand-cv {
      user-select: none;
      cursor: pointer;
      width: 24px;
    }
  }
  .scroll-wrapper {
    position: relative;
  }

  .btn-open-new-tab {
    position: absolute;
    top: 20px;
    right: 70px;
  }
</style>
