import preprocess from 'svelte-preprocess';
import windi from 'vite-plugin-windicss';
import node from '@sveltejs/adapter-node';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess()],
	compilerOptions: {
	
	},

	kit: {
		target: '#svelte',
		adapter: node({
			precompress: true,
			env: {
				port: process.env.PORT
			}
		}),
		prerender: {
			crawl: false,
			enabled: false,
			entries: ['*'],
			onError: 'continue'
		},
		vite: () => ({
			optimizeDeps: {
				include: []
			},
			plugins: [
				windi({
					configPath: './windi.config.js'
				})
			],
			resolve: {
				alias: {
					// these are the aliases and paths to them
					'@components': path.resolve('./src/components'),
					'@core': path.resolve('./src/core'),
					'@stores': path.resolve('./src/stores'),
					'@styles': path.resolve('./src/styles'),
					'@utils': path.resolve('./src/utils')
				}
			}
		})
	}
};

export default config;
