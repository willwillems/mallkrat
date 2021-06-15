/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* jshint esversion: 9 */

import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

const config = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: 'postcss',
			},
			postcss: true, // cfeate config file
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
