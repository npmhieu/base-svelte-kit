import { variables } from '@core/variables';
import type {EventName} from '@core/constants';
// const base = import.meta.env.VITE_CRM_API_URL;
const base = 'https://staging-api2.primus.vn/api';

export const api = {
	post: async (service: APIService, endpoint: string, payload: any, option?: APIOptions ) => {
		try {
			return (option?.fetch || fetch)(mapEndpoint(service, endpoint), {
				body: JSON.stringify(payload),
				...extendAPIOption(option),
				method: 'POST'
			}).then(response => response.json())
		}
		catch (e) {
			return e;
		}
	},
	get
}

function mapEndpoint(service: APIService, endpoint: string, params: {[param: string]: string | string[]} = {}): string
	{
		const noParamEndpoint = endpoint.split(/[?#]/)[0];
		const mappedAPIURL = {
			'provider': variables.apiUrlV1 + '/provider',
			'provider-v2': variables.apiUrlV2 + '/provider',
			'search': variables.apiUrlV1 + '/search',
			'crm': variables.crmApiUrl + '/crm',
		}
		return `${mappedAPIURL[service]}/${endpoint.startsWith('/') ? noParamEndpoint.substring(1) : noParamEndpoint}`
	}
	
	function extendAPIOption(option: APIOptions = {}): any {
	const mergedDefaultOption: APIOptions = Object.assign({
		withCredentials: true,
		headers: {
		}
	}, option)
	return {
		mode: 'cors',
		credentials: mergedDefaultOption.withCredentials ? 'include' : 'omit',
		header: Object.assign( {
			'Content-Type': 'application/json',
		}, mergedDefaultOption.headers)
	}
	}

type APIService = 'provider' | 'provider-v2' | 'user' | 'search' | 'crm';
interface APIOptions {
	headers?: {
		[header: string]: string | string[];
	};
	params?: {
		[param: string]: string | string[];
	};
	withCredentials?: boolean;
	fetch?: any;
	[props: string]: any;
}

interface EventPayload {
	event: EventName;
	[otherField: string]: any;
}

export const track = async (eventPayload: EventPayload) => {

}


async function send({ method, path, data, token }: {method: 'GET' | 'PUT' | 'DELETE' | 'POST', path: string, data?: any, token?: string}) {
	const opts: any = { method, headers: {} };
	
	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}
	
	if (token) {
		opts.headers['Authorization'] = token;
	}
	const url = `${base}/v1/crm/${path}`;
	
	console.log(`[API][${method}] ${url}`);
	
	return fetch(url, opts)
		.then((r) => r.json())
		.then((json) => json.data || json.content || null);
}

export function get(path, token?) {
	return send({ method: 'GET', path, token });
}

export function del(path, token?) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data?, token?) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data?, token?) {
	return send({ method: 'PUT', path, data, token });
}
