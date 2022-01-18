<script>
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
    import {notificationStore} from "@stores/notification.store";

    // export let themes = {
    //     danger: "#E26D69",
    //     success: "#84C991",
    //     warning: "#f0ad4e",
    //     info: "#5bc0de",
    //     default: "#aaaaaa",
    // };
</script>

<div class="notifications">
    {#each $notificationStore as notification (notification.id)}
        <div
                animate:flip
                class="crm-toast {notification.type}"
                transition:fly={{ y: 30 }}
        >
            <div class="content">
                {#if notification.icon}<i class='fe fe-{notification.icon} mr-4'/>{/if}
                <span>
                    {notification.message}
                </span>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
  .notifications {
    position: fixed;
    top: 38px;
    right: 38px;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
  }

  .crm-toast {
    flex: 0 0 auto;
    margin-bottom: 20px;
    border-radius: 12px;

    &.default {
      background-color: rgb(88, 88, 55);
      color: #fff;
      box-shadow: inset 0 0 0 1px rgb(88, 88, 55);
    }

    &.error {
      background-color: rgb(250, 250, 240);
      color: rgb(253, 88, 56);
      box-shadow: inset 0 0 0 1px rgb(253, 88, 56);

      i.fe {
        color: rgb(248, 184, 73);
      }
    }

    &.success {
      background-color: rgb(218, 230, 216);
      color: rgb(105, 201, 94);
      box-shadow: inset 0 0 0 1px rgb(105, 201, 94);


      i.fe {
        color: rgb(105, 201, 94);
      }
    }
  }

  .content {
    display: block;
    padding: 10px 16px;
    font-weight: 600;
    font-size: 13px;
  }
</style>
