// @ts-ignore
import { env } from '$lib/env';
import {api} from "@core/api";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {

    let {candidateId} = params;

    let nssCrmApi = env.VITE_CRM_API_URL;
    let url = `${nssCrmApi}/nss/candidate/${candidateId}/resume`;

    const res = await fetch(url);
    const json = await res.json();

    return { body: json };

}