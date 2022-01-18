/// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
	VITE_IS_PRODUCTION: boolean;
	VITE_IS_STAGING: boolean;
	VITE_IS_LOCALHOST: boolean;
	VITE_BASE_PATH: string;
	VITE_API_URL_V1: string;
	VITE_API_URL_V2: string;
	VITE_CRM_API_URL: string;
}

// declare namespace svelte.JSX {
// 	interface SvelteInputProps {
// 		webkitdirectory?: boolean;
// 	}
// }

type ModalCloseSource = 'button' | 'backdrop' | 'esc' | any;
