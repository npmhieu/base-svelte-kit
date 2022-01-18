// @ts-ignore
import {api} from "@core/api";
import {resume} from "@stores/user-store";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {
    const {candidateId} = params;
    
    const [brief, profile, notes, activities, applications, resume] = await Promise.all([
        api.get(`nss/candidate/${candidateId}`),
        api.get(`nss/candidate/${candidateId}/profile`),
        api.get(`nss/candidate/${candidateId}/note`),
        api.get(`nss/candidate/${candidateId}/activity`),
        api.get(`nss/candidate/${candidateId}/application`),
        api.get(`nss/candidate/${candidateId}/resume`),
    ]);
    return {
        body: {...brief, ...profile, notes, activities, applications, resume, userId: candidateId}
    };
}
