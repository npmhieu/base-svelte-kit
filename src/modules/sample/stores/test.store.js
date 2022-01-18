import { writable, get } from 'svelte/store'
import {searchFiltersStore, DefaultSearchString, searchQueryStore} from '@stores/search-filters.store';
import another from '@stores/another.store.js'
// const another = buildAnotherStore();

export const loading = writable(false);
export const error = writable(null);
export const data = writable(null);

export const updateData =  async function (obj){
    data.set(obj)
};

export const updatePartial =  async function (values){
    data.update(props => {
        return {...props, ...values};
    });
};

export const getData =  async function (url){
    await another.getAnotherData(url);

    console.log('new method')

    // let x = get(searchFiltersStore);
    let other = get(another.anotherData);
    console.log(other);

    another.updatePartial({newProp: "test", name: 'ok'})


    let test = get(another.anotherData);
    console.log(other, test);

    another.updateData({name:'only ok men'});
    let test2 = get(another.anotherData);
    console.log(other, test, test2);

    loading.set(true);
    error.set(null);
    try {
        const response = await fetch(url);
        data.set(await response.json())
    } catch (e) {
        error.set(e)
    }
    loading.set(false)
};

// export default function () {
//     const loading = writable(false);
//     const error = writable(false);
//     const data = writable({});
//
//
//     async function getData(url) {
//
//         await another.getAnotherData(url);
//
//         // let x = get(searchFiltersStore);
//         let other = get(another.anotherData);
//         console.log(other);
//
//         another.updatePartial({newProp: "test", name: 'ok'})
//
//
//         let test = get(another.anotherData);
//         console.log(other, test);
//
//         another.updateData({name:'only ok men'});
//         let test2 = get(another.anotherData);
//         console.log(other, test, test2);
//
//         loading.set(true)
//         error.set(false)
//         try {
//             const response = await fetch(url);
//             data.set(await response.json());
//
//
//         } catch(e) {
//             error.set(e)
//         }
//         loading.set(false)
//     }
//
//     // getData()
//
//     return {data, loading, error, getData}
// }