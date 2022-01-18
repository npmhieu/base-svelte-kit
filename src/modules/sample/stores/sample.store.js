// this is store skeleton
// next: hook to set user session

import {writable} from 'svelte/store'

export const loading = writable(false);
export const error = writable(null);
export const sampleData = writable(null);

export const updateData =  async function (obj){
    sampleData.set(obj)
};

export const updatePartial =  async function (values){
    sampleData.update(props => {
        return {...props, ...values};
    });
};

export const getSampleData =  async function (url){
    loading.set(true);
    error.set(null);
    try {
        const response = await fetch(url);
        this.anotherData.set(await response.json())
    } catch (e) {
        error.set(e)
    }
    loading.set(false)
};

