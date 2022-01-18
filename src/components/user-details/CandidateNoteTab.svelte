<script lang="ts">

    import {enhancedUserStore} from "@stores/user-store";
</script>
{#if $enhancedUserStore.currentUser}
    <section>
        <div class="note-list">
            {#each ($enhancedUserStore.currentUser.notes || []) as note}
                <div class="note-item">
                    <div class="w-full">
                        <p class="text-blue text-xxs font-medium">
                            {note.authorRole}
                        </p>
                        <div class="flex items-center">
                            <div>
                                {note.author}
                            </div>
                            <div class="flex items-center text-low-dark mr-0 ml-auto">
                                <i class="fe fe-clock mr-2"></i>
                                {note.createdOn}
                            </div>
                        </div>
                    </div>
                    <div class="text-low-dark text-xs mt-5">
                        {note.content}
                    </div>
                </div>
            {/each}
        </div>
        <div class="submit-form">
            <textarea placeholder="Type your note here"></textarea>

            <button class="btn raised flat primary font-bold">
                Save note
            </button>
        </div>
    </section>
{/if}
<style lang="scss">
  section {
    display: flex;
    flex-flow: column;
    height: 100%;

    .note-list {
      padding: 40px 60px;
      overflow: auto;
      flex: 1 1 0;

      .note-item {
        width: 558px;
        margin-left: auto;
        padding: 25px 18px 25px 28px;
        border-radius: 11.8px;
        box-shadow: 0 4px 8px 0 rgba(60, 29, 137, 0.08);
        border: solid 1px #d9d9d9;
        background-color: #fff;
        margin-bottom: 20px;
        transition: .2s box-shadow ease-in-out;

        &:hover {
          box-shadow: 0 4px 12px 0 rgba(60, 29, 137, 0.2);
        }
      }
    }

    .submit-form {
      border-top: 1px solid rgba(#8e8e93, .3);
      padding: 20px;
      display: flex;
      align-items: center;

      textarea {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.29;
        color: rgba(60, 60, 67, 0.4);
        flex: 1;
        margin-right: 10px;
        min-height: 36px;
        max-height: 100px;
        height: 36px;
        padding: 9px 24px;
        border-radius: 4px;
        background-color: #f3f4f6;
      }
    }
  }
</style>
