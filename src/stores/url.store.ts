import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type {Unsubscriber} from "svelte/types/runtime/store";

const URLSearchParamsToObject = (params: URLSearchParams) => {
	const obj = {};
	params.forEach((v: string, k: string) => {
		obj[k] = v;
	});
	return obj;
};

export const createQueryParamsStore = (key: string) => {
	let params;
	page.subscribe((v) => {
		params = URLSearchParamsToObject(v.url.searchParams);
	});

	return {
		subscribe: (cb: () => any) => {
			return page.subscribe((p) => {
				cb(p.url.searchParams.get(key));
			});
		},
		set: (value: string) => {
			params[key] = value;
			const urlSearchParams = new URLSearchParams(params);
			void goto(`?${urlSearchParams.toString()}`, {
				keepfocus: true,
				replaceState: true,
				noscroll: true
			});
		}
	};
};