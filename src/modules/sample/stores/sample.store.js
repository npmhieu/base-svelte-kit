// this is store skeleton
// next: hook to set user session

import {writable} from 'svelte/store'

export default {
    loading: writable(false),
    error: writable(false),
    sampleData: writable(null),

    updateData(obj) {
        this.sampleData.set(obj);
    },

    updatePartial(values) {

        this.sampleData.update(props => {
            return {...props, ...values};
        });
    },
    
    async getAnotherData(url) {

        this.loading.set(true)
        this.error.set(false)
        try {
            const response = await fetch(url);
            this.sampleData.set(await response.json())
        } catch (e) {
            this.error.set(e)
        }
        this.loading.set(false)
    }
}