export const variables = {
	isProd: import.meta.env.VITE_IS_PRODUCTION,
	isDev: import.meta.env.VITE_IS_LOCALHOST,
	isTest: import.meta.env.VITE_IS_STAGING,
	basePath: import.meta.env.VITE_BASE_PATH,
	apiUrlV1: import.meta.env.VITE_API_URL_V1,
	apiUrlV2: import.meta.env.VITE_API_URL_V2,
	crmApiUrl: import.meta.env.VITE_CRM_API_URL
};

export const allVars = import.meta.env;
export const nssBaseApi = import.meta.env.VITE_CRM_API_URL;

export const kitApi = {
	search: '/api/search',
	candidate: '/api/candidate',
};

