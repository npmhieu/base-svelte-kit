import { writable, get } from 'svelte/store'
import { getUrlParameter } from '@utils/common.util.js'
import jwt_decode from "jwt-decode";

// TODO refactor to hook and session later
export const currentConsultant = writable(null);
export const getConsultant =  async function (){
    let token = getUrlParameter('token');
    let hash = getUrlParameter('hash');
    if (!token || !hash) {
        return
    }
    let consultant = get(currentConsultant);

    let decoded = jwt_decode(token);

    console.log(decoded);
    let user = {
        id: 1,
        name: 1,
    };
    consultant = user;
    console.log(consultant);
};
