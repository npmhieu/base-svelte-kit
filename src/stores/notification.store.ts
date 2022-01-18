import {derived, writable} from "svelte/store"
import type {NotificationStoreItem, ToastOption} from "@core/models";
import {ToastType} from "@core/constants";

const defaultTimeout = 3500;

function createNotificationStore() {
    const _notifications = writable<NotificationStoreItem[]>([])

    function send(message: string, type: ToastType = ToastType.Default, option?: ToastOption) {
        _notifications.update(notifications => {
            return [
                    ...notifications,
                    {
                        id: randomId(),
                        type,
                        message,
                        ...{
                            timeout: defaultTimeout,
                            ...(option || {})
                        }
                    }]
            }
        )
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications);

        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const {subscribe} = notifications

    return {
        subscribe,
        send,
        default: (msg, option?: ToastOption) => send(msg, ToastType.Default, option),
        error: (msg, option?: ToastOption) => send(msg, ToastType.Error, option),
        warning: (msg, option?: ToastOption) => send(msg, ToastType.Warning, option),
        info: (msg, option?: ToastOption) => send(msg, ToastType.Info, option),
        success: (msg, option?: ToastOption) => send(msg, ToastType.Success, option),
    }
}

function randomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const notificationStore = createNotificationStore()
