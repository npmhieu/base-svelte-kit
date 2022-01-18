<script context="module">
    import {Candidate} from "@core/models";
    import {enhancedUserStore} from '@stores/user-store';
    import {pageStore} from "@stores/page.store";


    export async function load({params, fetch}) {
        const {userId} = params;

        const candidate = new Candidate(await fetch(`/api/candidate/${userId}.json`).then(rs => rs.json()));


        // newUserStore.setCurrentUser(candidate);
        return {
            props: {candidate: candidate}
        };
    }

    // export async function externalFetch(request) {
    // 	if (request.url.startsWith(variables.basePath)) {
    // 		// clone the original request, but change the URL
    // 		request = new Request(
    // 			request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
    // 			request
    // 		);
    // 	}
    //
    // 	return fetch(request);
    // }
</script>
<script lang="ts">

    import UserDetail from '@components/user-details/UserDetail.svelte';
    import UserItem from '@components/user-list/UserItem.bak.svelte';

    import {CurrentPage} from "@core/constants";
    pageStore.setCurrentPage({
        currentPage: CurrentPage.CandidateDetailInNewTab
    });

    export let candidate: Candidate;

    enhancedUserStore.setCurrentUser(candidate);

    // $userStore.selectedId = candidate.userId;


</script>
<svelte:head>
    <title>{$enhancedUserStore.currentUser?.fullName}</title>
    <script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>
</svelte:head>

{#if $enhancedUserStore.currentUser}
    <div id="user-detail-page">
        <aside>
            <UserItem user={$enhancedUserStore.currentUser}/>
        </aside>
        <UserDetail/>
    </div>
{/if}

<style lang="scss">
  #user-detail-page {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px;
    height: 100vh;
    display: flex;
  }

  aside {
    width: 440px;
    min-width: 440px;
    padding-right: 20px;
    padding-top: 4px;
  }
</style>
