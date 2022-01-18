// @ts-ignore
import { env } from '$lib/env';


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function put({params}) {

    let nssCrmApi = env.VITE_CRM_API_URL;
    let {candidateId} = params;

    let url = `${nssCrmApi}/nss/candidate/${candidateId}/purchase`;

    const res = await fetch(url,{
        method: 'PUT'
    });

    const json = await res.json();
    return { body: json };
}