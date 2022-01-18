// @ts-ignore
import { env } from '$lib/env';


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {

    let nssCrmApi = env.VITE_CRM_API_URL;
    let {candidateId} = params;
    
    let url = `${nssCrmApi}/nss/candidate/${candidateId}`;


    const res = await fetch(url);
    const json = await res.json();

    return { body: json };

}