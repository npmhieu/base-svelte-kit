// @ts-ignore
import { env } from '$lib/env';


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({body}) {

    let nssSearchApi = env.VITE_CRM_API_URL + '/nss/search';

    const res = await fetch(nssSearchApi, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    });

    const json = await res.json();
    return { body: json };

}