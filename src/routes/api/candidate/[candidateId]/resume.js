// @ts-ignore
import { env } from '$lib/env';
import {api} from "@core/api";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {

    let {candidateId} = params;

    const cvFiles = await api.get(`nss/candidate/${candidateId}/resume`);
    if (!cvFiles?.length) {
        return { body:{content:null} };
    }

    // console.log(cvFiles);

    const res = await fetch(cvFiles[0].fileUrl, {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNvbnN1bHRhbnQgTmFtZSIsImVtYWlsIjoidG9hbi5kb0B2aWV0bmFtd29ya3MuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDkwMjJ9.jo_95Ki5r3hH0GIJGrSWUZdLlfJKPetmAvtfR7wwais',
                'Content-Type': 'application/json',
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Headers': "*",
                'access-control-allow-origin': "*"
            }
        }
    );

    if (res.status !== 200) {
        return {
            body: {
                content: null
            }
        }
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64Photo = Buffer.from(arrayBuffer).toString('base64');


    return { body:{content:base64Photo} };

}