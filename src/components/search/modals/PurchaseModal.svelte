<script lang="ts">
    import {EventName, CandidateSource} from '@core/constants';
    import {track} from '../../../core/api';
    import Modal from '@components/shared/modal.svelte';
    import {selectedUser, purchaseUserInfo} from '@stores/user-store';

    import {notificationStore} from "@stores/notification.store";

    let modal;

    $: {

    }

    function openDialog()
    {
        modal.open();
        void track({event: EventName.ClickFilterFunction});
    }

    function purchaseCandidate() {
        // selectedUser
        if(CandidateSource.VNW === $selectedUser.src){
            openDialog();
        } else {
            purchaseUserInfo().then(result => {
                if(result){
                    notificationStore.success('GET CANDIDATE CONTACT SUCCESS');
                }
            });
        }
    }

    function onModalClose({detail})
    {

        if (['apply'].includes(detail)) {
            purchaseUserInfo().then(result => {
                if(result){
                    notificationStore.success('GET CANDIDATE CONTACT SUCCESS');
                }
            });
            // todo show loading
            // console.log('purchase')
            //purchase
        }
    }

    function onCancel()
    {
        modal.close();
    }

</script>

<button class="btn download-button" on:click={purchaseCandidate}>
    {$selectedUser.haveCV ? 'View full CV' : 'Get contact'}
</button>

<Modal bind:this={modal} on:close={onModalClose}>
    <div slot="header">

    </div>
    <div slot="content">
        <div class="text-center p-4">
            <h3>Confirm spending credit? <br/>
                View full profile of {$selectedUser.fullName}</h3>
            <p>Are you sure to use {$selectedUser.vnwResumeCredit ? $selectedUser.vnwResumeCredit : '' } credit{$selectedUser.vnwResumeCredit > 1 ? 's' : ''} for this profile?</p>
        </div>

    </div>

    <div slot="footer" class="">

        <div class="text-center">
            <button class="btn btn-cancel" on:click={onCancel}>Cancel</button>
            <button class="btn btn-purchase ml-2" on:click="{() => modal.close('apply')}">Confirm</button>
        </div>

    </div>
</Modal>

<style lang="scss">

    :global(.content) {
        max-width: 700px;
    }


    p {
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #4e4e4e;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    h3 {
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.36;
        letter-spacing: normal;
        text-align: center;
        color: #1f8efa;
        text-transform: uppercase;
    }
    .btn-purchase{
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: -0.22px;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        background-color: #1f8efa;
      &:hover, &:focus, &:active {
        color: #fff;
      }
    }
    .btn-cancel{
        border-radius: 4px;
        border: solid 1px #aaaaae;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.36;
        letter-spacing: normal;
        text-align: left;
        color: #4e4e4e;
    }
</style>
