import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {ICurrentPage, IPageStore} from "@core/models";

function createPageStore(currentPageStore: Writable<ICurrentPage>): IPageStore {
    const {set, update, subscribe} = currentPageStore;
    return {
        subscribe,
        setCurrentPage: (data: ICurrentPage) => {
            set({
                currentPage: data.currentPage,
                data: data.data
            })
        }
    }
}

const _currentPage = writable<ICurrentPage>({
    currentPage: null,
    data: null
});

export const pageStore = createPageStore(_currentPage);