// this is store skeleton
// next: hook to set user session

import {writable} from 'svelte/store'

export default {
    loading: writable(false),
    error: writable(false),
    anotherData: writable(null),


    updateData(obj) {
        this.anotherData.set(obj);
    },

    updatePartial(values) {

        this.anotherData.update(props => {
            return {...props, ...values};
        });
    },
    async getAnotherData(url) {

        console.log(url);

        this.loading.set(true)
        this.error.set(false)
        try {
            const response = await fetch(url);
            console.log('another ', await response.json());
            this.anotherData.set({id: 1, name: 'John', obj: {id: 2, child: "test"}})
        } catch (e) {
            this.error.set(e)
        }
        this.loading.set(false)
    }
}